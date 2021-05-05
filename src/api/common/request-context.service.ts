import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import { Session } from '../../models/session.model';
import { RequestContext } from './request-context';

export const REQUEST_CONTEXT_KEY = 'CodeIRISRequestContext';

@Injectable()
export class RequestContextService {
  async fromRequest(
    req: Request,
    info?: GraphQLResolveInfo,
    session?: Session,
  ) {
    const user = session.type === 'AUTHENTICATED' && session.user;
    let isAuthorized = false;
    if (user) {
      isAuthorized = session.type === 'AUTHENTICATED';
    }
    return new RequestContext({
      session,
      isAuthorized,
      request: req,
    });
  }
}
