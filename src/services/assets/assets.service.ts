import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { File } from '../../models/file.model';
import { Stream } from 'stream';
import { DefaultAssetsNamingService } from './default-assets-naming.service';
import { SharpAssetPreviewService } from './sharp-asset-preview.service';
import { S3AssetsStorageService } from './s3-assets-storage.service';
import { getAssetType } from '../../common/shared-utils';
import { promisify } from 'util';
import { AssetType } from '../../common';
import { PrismaService } from '../prisma.service';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const sizeOf = promisify(require('image-size'));

@Injectable()
export class AssetsService {
  constructor(
    private readonly nameService: DefaultAssetsNamingService,
    private readonly previewService: SharpAssetPreviewService,
    private readonly s3storageService: S3AssetsStorageService,
    private readonly prisma: PrismaService,
  ) {}

  async sendAsset(key) {
    return this.s3storageService.readFileToBuffer(key);
  }

  async create(input: FileUpload): Promise<File> {
    const { createReadStream, filename, mimetype } = await input;
    const stream = createReadStream();
    const asset = await this.createAssetsInternal(stream, filename, mimetype);
    // TODO asset creation event
    return asset;
  }

  private async createAssetsInternal(
    stream: Stream,
    filename: string,
    mimeType,
  ): Promise<File> {
    const sourceFileName = await this.generateSourceFileName(filename);
    const previewFileName = await this.generatePreviewFileName(filename);
    const sourceFileIdentifier = await this.s3storageService.writeFileFromStream(
      sourceFileName,
      stream,
    );
    const sourceFile = await this.s3storageService.readFileToBuffer(
      sourceFileIdentifier,
    );
    let preview: Buffer;
    try {
      preview = await this.previewService.generatePreviewImage(
        mimeType,
        sourceFile,
        1600,
        1600,
      );
    } catch (e) {
      console.log(`Could not create Asset preview image: ${e.message}`);
      throw e;
    }
    const previewFileIdentifier = await this.s3storageService.writeFileFromBuffer(
      previewFileName,
      preview,
    );
    const type = getAssetType(mimeType);
    const { width, height } = this.getDimensions(
      type === AssetType.IMAGE ? sourceFile : preview,
    );
    return this.prisma.file.create({
      data: {
        preview: previewFileIdentifier,
        source: sourceFileIdentifier,
        width,
        height,
        name: path.basename(sourceFileName),
        size: sourceFile.byteLength,
      },
    });
  }

  private async generateSourceFileName(fileName: string): Promise<string> {
    return this.generateUnique(fileName, (name, conflict) =>
      this.nameService.generateSourceFileName(name, conflict),
    );
  }

  private async generatePreviewFileName(filename: string): Promise<string> {
    return this.generateUnique(filename, (name, conflict) =>
      this.nameService.generatePreviewFileName(name, conflict),
    );
  }

  private async generateUnique(
    inputFileName: string,
    generateFileNameFn: (filename: string, conflictName?: string) => string,
  ): Promise<string> {
    let outputName: string | undefined;
    do {
      outputName = generateFileNameFn(inputFileName, outputName);
    } while (await this.s3storageService.fileExist(outputName));
    return outputName;
  }

  private getDimensions(imageFile: Buffer): { width: number; height: number } {
    try {
      const { width, height } = sizeOf(imageFile);
      return { width, height };
    } catch (e) {
      console.log(`Could not determine Asset dimensions: ` + e);
      return { width: 0, height: 0 };
    }
  }
}
