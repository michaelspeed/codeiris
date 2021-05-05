import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Auth } from '../../../models/auth.model';
import { AuthService } from '../../../services/auth.service';
import { MagicLinkDto } from './dto/magic-link.dto';
import { User } from '../../../models/user.model';

@Resolver((of) => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => MagicLinkDto)
  async sendMagicLink(@Args('email') email: string): Promise<MagicLinkDto> {
    return this.authService.sendMagicLink({ email });
  }

  //TODO remove this
  @Query(() => Auth)
  async getAuth(): Promise<Auth> {
    return {
      accessToken: '',
      refreshToken: '',
      user: null,
    };
  }

  @ResolveField('user', () => User)
  async user(@Parent() auth: Auth) {
    return this.authService.getUserFromToken(auth.accessToken);
  }
}
