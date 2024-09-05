import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { ResponseModelDto } from '../dto/basic.dto';

@Injectable()
export class ExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('error:', exception.message);
    console.log('error status code:', exception.statusCode);
    console.log('error stack', exception.stack);
    const context = host.switchToHttp();
    const res = context.getResponse();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const error =
        (exception.getResponse() as any).message ?? exception.message;

      const response = new ResponseModelDto({
        statusCode: status,
        error: Array.isArray(error) ? error : [error],
      });

      return res.status(response.statusCode).json(response);
    }

    if (exception.code === 'ENOENT') {
      const response = new ResponseModelDto({
        statusCode: 404,
        error: ['url or asset not found'],
      });

      return res.status(response.statusCode).json(response);
    }

    console.log(exception);

    const response = new ResponseModelDto({
      statusCode: 500,
      error: ['internal server error'],
    });

    return res.status(response.statusCode).json(response);
  }
}
