import { Module } from '@nestjs/common';
import { ServicesModule } from '../../../services/services.module';
import { TagResolver } from './tag.resolver';

@Module({
  imports: [ServicesModule],
  providers: [TagResolver],
})
export class TagModule {}
