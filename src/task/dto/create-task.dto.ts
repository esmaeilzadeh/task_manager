import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Allow, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  title: string;
  @ApiPropertyOptional({ default: '' })
  @IsOptional()
  @IsString()
  description: string;
}
