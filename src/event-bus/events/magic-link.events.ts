import { CodeirisEvents } from '../codeiris-events';
import { Auth } from '../../models/auth.model';

export class MagicLinkEvent extends CodeirisEvents {
  constructor(public token: string, public email: string) {
    super();
  }
}

export class MagicLinkVerificationEvent extends CodeirisEvents {
  constructor(
    public sessionToken,
    public authenticationData: { auth: Auth; isRegistered: boolean },
  ) {
    super();
  }
}
