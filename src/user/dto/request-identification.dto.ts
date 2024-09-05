import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class RequestIdentificationDto {
  @ApiProperty()
  @IsString()
  firstname: string;
  @ApiProperty()
  @IsString()
  lastname: string;
  @ApiProperty()
  @IsString()
  nationalID: string;
  @ApiProperty()
  @IsString()
  companyName: string;
  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  birthdate: Date;
  @ApiProperty()
  @IsString()
  financialNumber: string;
  @ApiProperty({ format: 'binary' })
  nationalCardFile?: string;
  @ApiProperty({ format: 'binary' })
  certificateFile?: string;
}
