import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/services.module';
import { PostResolver } from './post.resolver';

@Module({
  imports: [ServicesModule],
  providers: [PostResolver],
})
export class PostModule {}
