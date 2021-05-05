import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { ServicesModule } from '../../../services/services.module';
import { RequestContextService } from '../../common/request-context.service';

@Module({
  imports: [ServicesModule],
  providers: [UserResolver, RequestContextService],
})
export class UserModule {}
