import { FileOptions } from './file-options.entity';

export type UploadOptions = {
  extensions: string[];
  fileSizeLimit: number;
  path: string;
  files: FileOptions[];
};
