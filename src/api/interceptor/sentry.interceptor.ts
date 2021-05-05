import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GqlContextType, GraphQLArgumentsHost } from '@nestjs/graphql';
import * as Sentry from '@sentry/node';
import { Handlers, Severity } from '@sentry/node';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { SentryInterceptorOptions } from '../common/interceptors/sentry-intercept-options';

let GqlArgumentsHost: any;
try {
  ({ GqlArgumentsHost } = require('@nestjs/graphql'));
} catch (e) {}

@Injectable()
export class SentryInterceptor implements NestInterceptor {
  private options: SentryInterceptorOptions = {};

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      tap({
        error: (exception) => {
          if (this.shouldReport(exception)) {
            switch (context.getType<GqlContextType>()) {
              case 'http':
                Sentry.withScope((scope) => {
                  this.addHttpExceptionMetadatas(scope, context.switchToHttp());
                  return this.captureException(exception, scope, context);
                });
                break;
              case 'graphql':
                Sentry.withScope((scope) => {
                  if (!GqlArgumentsHost) {
                    return this.captureException(exception, scope, context);
                  }
                  this.addGraphQLExceptionMetadatas(
                    scope,
                    GqlArgumentsHost.create(context),
                  );
                  this.captureException(exception, scope, context);
                });
                break;
              default:
                Sentry.withScope((scope) => {
                  return this.captureException(exception, scope, context);
                });
                break;
            }
          }
        },
      }),
    );
  }

  /**
   * @description - Detect the error state and level of error here
   * @param exception
   * @private
   */
  private getExceptionStage(exception) {
    if (exception.status > 499) {
      return Severity.Fatal;
    } else if (exception.status > 399) {
      return Severity.Error;
    } else {
      return Severity.Debug;
    }
  }

  private addGraphQLExceptionMetadatas(
    scope: Sentry.Scope,
    gqlHost: GraphQLArgumentsHost,
  ): void {
    const context = gqlHost.getContext();
    // Same as HttpException
    const data = Handlers.parseRequest({}, context?.req || context);
    scope.setExtra('req', data.request);
    // tslint:disable-next-line:no-unused-expression
    data.extra && scope.setExtras(data.extra);
    if (data.user) {
      scope.setUser(data.user);
    }

    // GraphQL Specifics
    const info = gqlHost.getInfo();
    scope.setExtra('fieldName', info.fieldName);
    const args = gqlHost.getArgs();
    scope.setExtra('args', args);
  }

  private addHttpExceptionMetadatas(
    scope: Sentry.Scope,
    http: HttpArgumentsHost,
  ): void {
    const data = Handlers.parseRequest({} as any, http.getRequest());

    scope.setExtra('req', data.request);
    // tslint:disable-next-line:no-unused-expression
    data.extra && scope.setExtras(data.extra);
    if (data.user) {
      scope.setUser(data.user);
    }
  }

  private async captureException(
    exception,
    scope: Sentry.Scope,
    context: ExecutionContext,
  ) {
    const level = this.getExceptionStage(exception);
    scope.setLevel(level);
    try {
      Sentry.captureException(exception, scope);
    } catch (e) {
      // TODO create a logger for overflow sentry
      console.log(e);
    }
  }

  private shouldReport(exception: any): boolean {
    if (!this.options.filters) {
      return true;
    }
    return this.options.filters.every((types) => {
      return !(exception instanceof types);
    });
  }

  private serializeRequest(request): any {
    const j = {
      headers: request.headers,
      rawHeaders: request.rawHeaders,
      url: request.url,
      method: request.method,
      statusCode: request.statusCode,
      statusMessage: request.statusMessage,
      params: request.params,
      query: request.query,
      cookies: request.cookies,
      body: request.body,
      route: request.route,
    };
    return j;
  }
}
