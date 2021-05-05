import { Injectable } from '@nestjs/common';
import { AssetsStorageStrategy } from '../../common/strategy/assets-storage.strategy';
import { Request } from 'express';
import * as path from 'path';
import { Stream } from 'stream';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3AssetsStorageService implements AssetsStorageStrategy {
  constructor(
    @InjectAwsService(S3) private readonly S3: S3,
    private readonly config: ConfigService,
  ) {
    this.ensureBucket();
  }

  public readonly toAbsoluteUrl: (
    request: Request,
    identifier: string,
  ) => string;

  private async ensureBucket() {
    let bucketExist = false;
    try {
      await this.S3.headBucket({
        Bucket: this.config.get<string>('BUCKET'),
      }).promise();
      bucketExist = true;
    } catch (e) {
      console.log(e);
    }
    if (!bucketExist) {
      try {
        await this.S3.createBucket({
          Bucket: this.config.get<string>('BUCKET'),
        }).promise();
      } catch (e) {
        console.log(e);
      }
    }
  }

  private getObjectParams(identifier: string) {
    return {
      Bucket: this.config.get<string>('BUCKET'),
      Key: path.join(identifier.replace(/^\//, '')),
    };
  }

  async deleteFile(identifier: string): Promise<void> {
    await this.S3.deleteObject(this.getObjectParams(identifier)).promise();
  }

  async fileExist(fileName: string): Promise<boolean> {
    try {
      await this.S3.headObject(this.getObjectParams(fileName)).promise();
      return true;
    } catch (e) {
      return false;
    }
  }

  async readFileToBuffer(identifier: string): Promise<Buffer> {
    const result = await this.S3.getObject(
      this.getObjectParams(identifier),
    ).promise();
    return Buffer.from(result.Body as Buffer);
  }

  async readFileToStream(identifier: string): Promise<Stream> {
    const result = await this.S3.getObject(
      this.getObjectParams(identifier),
    ).createReadStream();
    return result;
  }

  async writeFileFromBuffer(fileName: string, data: Buffer): Promise<string> {
    const result = await this.S3.upload({
      Bucket: this.config.get<string>('BUCKET'),
      Key: fileName,
      Body: data,
    }).promise();
    return result.Key;
  }

  async writeFileFromStream(fileName: string, data: Stream): Promise<string> {
    const result = await this.S3.upload({
      Bucket: this.config.get<string>('BUCKET'),
      Key: fileName,
      Body: data,
    }).promise();
    return result.Key;
  }
}
