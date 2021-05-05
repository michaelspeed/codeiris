export interface AssetsPreviewStrategy {
  generatePreviewImage(
    mimeType: string,
    data: Buffer,
    maxHeight: number,
    maxWidth: number,
  ): Promise<Buffer>;
}
