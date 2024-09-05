import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from 'class-validator';
export class OtpPhoneResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^(\+\d{1,3}[- ]?)?(0?\d{10})$/)
  cellphone: string;
  @ApiProperty()
  @IsNotEmpty()
  otp: string;
  @ApiProperty()
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  @IsString()
  newPassword: string;
}
