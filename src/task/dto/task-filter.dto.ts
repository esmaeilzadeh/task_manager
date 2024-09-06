import { PaginationQueryDto } from '../../shared/dto/pagination-query.dto';
import { PaginationInterface } from '../../shared/interface/pagination.interface';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskFilterDto implements PaginationInterface {
  @ApiProperty({ default: 1 })
  page: number;
  @ApiProperty({ default: 10 })
  size: number;
  @ApiPropertyOptional()
  completed?: boolean;
}
