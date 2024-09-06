import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { TaskEntity } from '../entity/task.entity';
import { TaskFilterDto } from '../dto/task-filter.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationHelper } from '../../shared/helper/pagination.helper';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(
    private dataSource: DataSource,
    private paginationHelper: PaginationHelper,
  ) {
    super(TaskEntity, dataSource.createEntityManager());
  }

  getAll(filter: TaskFilterDto, userId: string) {
    const pagination = this.paginationHelper.getPagination(filter);
    return this.find({
      where: {
        completed: filter.completed,
        userId: userId,
      },
      ...pagination,
    });
  }

  async getOne(id: string, userId: string) {
    return this.findOne({
      where: {
        id: id,
        userId: userId,
      },
    });
  }
}
