import { PaginationQueryDto } from '../../shared/dto/pagination-query.dto';

export class TaskFilterDto extends PaginationQueryDto {
  isDone?: boolean;
}
