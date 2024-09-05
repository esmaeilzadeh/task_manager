import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadOptions } from '../entity/upload-options.entity';
import UploadOptionBuilder from './upload-options.helper';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UploadFactory extends UploadOptionBuilder {
  public createUploadInterceptor({
    extensions,
    fileSizeLimit,
    path,
    files,
  }: UploadOptions) {
    const options = this.setFileExtensionFilter(extensions)
      .setFileSizeLimit(fileSizeLimit)
      .setFileStorageLocation(path)
      .getOptions();

    return FileFieldsInterceptor(files, options);
  }
}
