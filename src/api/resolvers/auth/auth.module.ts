import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/services.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from '../../../config/config.interface';
import { GQLAuthGuard } from './guards/auth.guard';
import { RequestContextService } from '../../common/request-context.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const config = configService.get<SecurityConfig>('security');
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.expiresIn,
          },
        };
      },
      inject: [ConfigService],
    }),
    ServicesModule,
  ],
  providers: [JwtStrategy, AuthResolver, RequestContextService],
})
export class AuthModule {}
