import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Session } from '../../../../models/session.model';
import { extractAuthToken } from '../../../common/extract-auth-token';
import { SessionService } from '../../../../services/session.service';
import { parseContext } from '../../../common/parse-context';
import {
  REQUEST_CONTEXT_KEY,
  RequestContextService,
} from '../../../common/request-context.service';

@Injectable()
export class GQLAuthGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private readonly requestContextService: RequestContextService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { req, res, info } = parseContext(context);
    if (info) {
      const session = await this.getSession(req, res);
      const requestContext = await this.requestContextService.fromRequest(
        req,
        info,
        session,
      );
      (req as any)[REQUEST_CONTEXT_KEY] = requestContext;
      return true;
    } else {
      return true;
    }
  }

  private async getSession(
    req: Request,
    res: Response,
  ): Promise<Session | undefined> {
    const authToken = extractAuthToken(req);
    let session: Session | undefined;
    if (authToken) {
      session = await this.sessionService.validateSession(authToken);
      if (session) {
        return session;
      }
    }
    if (!session) {
      session = await this.sessionService.createAnonymousSession();
    }
    return session;
  }
}
