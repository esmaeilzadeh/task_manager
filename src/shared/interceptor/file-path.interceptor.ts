import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FileType } from '../type/file.type';

@Injectable()
export class FilePathInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const uploadedFiles = Object.values(request.files) as FileType[][];

    if (!uploadedFiles.length) {
      return next.handle();
    }

    const files = uploadedFiles.reduce((prev, current) => prev.concat(current));

    files.map((file) => (file.path = file.path.replace('public', '')));

    return next.handle();
  }
}
