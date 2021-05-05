import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { ServicesModule } from '../../../services/services.module';

@Module({
  imports: [ServicesModule],
  providers: [CommentResolver],
})
export class CommentModule {}
