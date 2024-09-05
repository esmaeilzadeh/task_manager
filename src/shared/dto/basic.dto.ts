export class ResponseModelDto {
  constructor({ statusCode = 0, data = {}, message = null, error = [] }) {
    this.data = data ? data : {};
    this.error = error ? error : [];
    this.message = message ? message : null;
    this.statusCode = statusCode ? statusCode : 0;
  }
  data?: object | any;
  message?: string;
  error?: string[] | [];
  statusCode: number;
}
export function responseModelFactory({
  statusCode = 0,
  data = {},
  message = null,
  error = [],
}): ResponseModelDto {
  return new ResponseModelDto({ statusCode, data, message, error });
}
