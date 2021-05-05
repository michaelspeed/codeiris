import { JsonCompatible } from '../../common';
import { Session } from '../../models/session.model';
import { User } from '../../models/user.model';
import { Request } from 'express';

export type SerializeRequestContext = {
  _session: JsonCompatible<Session> & {
    user: JsonCompatible<User>;
  };
  _isAuthorized: boolean;
  _req: Request;
};

export class RequestContext {
  private readonly _session?: Session;
  private _isAuthorized;
  _req: Request;

  constructor(options: {
    session: Session;
    isAuthorized: boolean;
    request: Request;
  }) {
    const { session, isAuthorized, request } = options;
    this._session = session;
    this._isAuthorized = isAuthorized;
    this._req = request;
  }

  static deserialize(ctxObject: SerializeRequestContext): RequestContext {
    let session: Session | undefined;
    let isAuthorized: boolean;
    if (ctxObject._session) {
      if (ctxObject._session.user) {
        const user = new User(ctxObject._session.user);
        session = new Session({
          ...ctxObject._session,
          user,
          type: 'AUTHENTICATED',
        });
        isAuthorized = true;
      } else {
        session = new Session(ctxObject._session);
        isAuthorized = false;
      }
    }
    return new RequestContext({
      session,
      isAuthorized: isAuthorized,
      request: ctxObject._req,
    });
  }

  serialize(): SerializeRequestContext {
    return JSON.parse(JSON.stringify(this));
  }

  get session(): Session | undefined {
    return this._session;
  }

  get user(): User | undefined {
    if (this.session) {
      if (this.isAuthenticatedSession(this.session)) {
        return this.session.user;
      }
    }
  }

  private isAuthenticatedSession(session: Session): boolean {
    return session.type === 'AUTHENTICATED';
  }
}
