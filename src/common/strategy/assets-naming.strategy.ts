export interface AssetsNamingStrategy {
  generateSourceFileName(
    originalFileName: string,
    conflictFileName?: string,
  ): string;
  generatePreviewFileName(
    sourceFileName: string,
    conflictFileName?: string,
  ): string;
}
