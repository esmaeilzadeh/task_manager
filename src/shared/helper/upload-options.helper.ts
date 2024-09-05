import { BadRequestException, Injectable } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export default class UploadOptionBuilder {
  private options: MulterOptions = {};

  //supported files extension list e.g. ['png', 'jpg']
  protected setFileExtensionFilter(extensions: string[]): this {
    this.options.fileFilter = (_, file, callback) => {
      const extension = file.originalname.split('.').pop();

      if (!extensions.includes(extension)) {
        return callback(
          new BadRequestException('file type is not supported'),
          false,
        );
      }

      callback(null, true);
    };

    return this;
  }

  //maximum file size limit in mb
  protected setFileSizeLimit(limit: number): this {
    this.options.limits = {
      fileSize: limit * 1024 * 1024,
    };

    return this;
  }

  //where to store the files relative to projects root public folder
  protected setFileStorageLocation(relativePath: string): this {
    this.options.storage = diskStorage({
      filename(req, file, cb) {
        const extension = file.originalname.split('.').pop();

        const filename = `${uuidv4()}.${extension}`;

        cb(null, filename);
      },

      destination(req, file, cb) {
        const preFix = './public';

        const filePath = relativePath.startsWith('/')
          ? `${preFix}${relativePath}`
          : `${preFix}/${relativePath}`;

        const directory = path.join(__dirname, '../../..', filePath);

        if (!fs.existsSync(directory)) {
          fs.mkdirSync(directory, { recursive: true });
        }

        cb(null, filePath);
      },
    });

    return this;
  }

  protected getOptions(): MulterOptions {
    return this.options;
  }
}
