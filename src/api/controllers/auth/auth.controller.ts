import {
  BadRequestException,
  Controller,
  Get,
  Header,
  Headers,
  Param,
  Post,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from '../../../services/auth.service';
import { Response } from 'express';
import { SessionService } from '../../../services/session.service';
import { ConfigService } from '@nestjs/config';
import { Auth } from '../../../models/auth.model';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
    private readonly configService: ConfigService,
  ) {}

  @Get('validationError')
  @Render('magicLinkError')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async magicLinkError() {}

  @Get(':token')
  @Render('magicLinkValidating')
  async getMagicLinkUser(@Param('token') token: string) {
    const validate = await this.authService.validateMagicLink({ token });
    if (!validate.invalid) {
      return {
        invalid: false,
        auth: {
          accessToken: validate.auth.refreshToken,
          refreshToken: validate.auth.refreshToken,
        },
      };
    }
    return {
      invalid: true,
    };
  }

  // TODO this we will revisit again due to some unexpected behaviour
  @Post('/refresh-token')
  @Header('Cache-Control', 'no-cache')
  async refreshToken(@Headers('refresh_token') reftoken): Promise<any> {
    const serverPath = this.configService.get<string>(
      'NEXT_PUBLIC_SERVER_PATH',
    );
    if (reftoken === undefined || reftoken === 'undefined') {
      return {
        tokens: {
          jwt_token: undefined,
          refresh_token: undefined,
          invalid: true,
        },
      };
    } else if (reftoken === null || reftoken === 'null') {
      return {
        tokens: {
          jwt_token: undefined,
          refresh_token: undefined,
          invalid: true,
        },
      };
    } else {
      const sessioninfo = await this.sessionService.revalidateSession(reftoken);
      if (sessioninfo) {
        return {
          tokens: {
            jwt_token: sessioninfo?.authToken,
            refresh_token: sessioninfo?.refreshToken,
            invalid: false,
          },
        };
      } else {
        return {
          tokens: {
            jwt_token: undefined,
            refresh_token: undefined,
            invalid: true,
          },
        };
      }
    }
  }
}
