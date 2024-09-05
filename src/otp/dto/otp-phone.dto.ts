import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class OtpPhoneDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(\+\d{1,3}[- ]?)?(0?\d{10})$/)
  cellphone: string;
}
