import { ParseUUIDPipe ,Param } from '@nestjs/common';
export const UUIDParam = (name: string) => Param(name, new ParseUUIDPipe());
