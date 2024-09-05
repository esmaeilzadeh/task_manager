import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateIdentificationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  firstname?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lastname?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  nationalID?: string;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  companyName?: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate()
  birthdate?: Date;
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  financialNumber?: string;
  @ApiPropertyOptional({ format: 'binary' })
  @IsOptional()
  nationalCardFile?: string;
  @ApiPropertyOptional({ format: 'binary' })
  @IsOptional()
  certificateFile?: string;
}
