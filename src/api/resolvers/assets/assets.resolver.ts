import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { File } from '../../../models/file.model';
import { AssetsService } from '../../../services/assets/assets.service';
import { GraphQLUpload } from 'apollo-server-express';
import { FileUpload } from 'graphql-upload';

@Resolver(() => File)
export class AssetsResolver {
  constructor(private readonly assetService: AssetsService) {}

  @Mutation(() => File)
  async createAsset(
    @Args('file', { type: () => GraphQLUpload }) args: FileUpload,
  ): Promise<File> {
    const asset = await this.assetService.create(args);
    return asset;
  }
}
