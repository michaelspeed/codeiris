import { Module } from '@nestjs/common';
import { AssetsResolver } from './assets.resolver';
import { ServicesModule } from '../../../services/services.module';

@Module({
  imports: [ServicesModule],
  providers: [AssetsResolver],
})
export class AssetsModule {}
