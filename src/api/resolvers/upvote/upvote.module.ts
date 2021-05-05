import { Module } from '@nestjs/common';
import { RequestContextService } from '../../common/request-context.service';
import { ServicesModule } from '../../../services/services.module';
import { UpvoteResolver } from './upvote.resolver';

@Module({
  imports: [ServicesModule],
  providers: [UpvoteResolver, RequestContextService],
})
export class UpvoteModule {}
