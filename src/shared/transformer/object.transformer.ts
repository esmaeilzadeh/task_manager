import { BadRequestException } from '@nestjs/common';
import { TransformFnParams } from 'class-transformer';

export function objectParser(params: TransformFnParams): any {
  try {
    return JSON.parse(params.value);
  } catch (error) {
    throw new BadRequestException('invalid JSON was provided');
  }
}
