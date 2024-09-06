import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { TaskEntity } from '../entity/task.entity';

@Injectable()
export class TaskRepository extends Repository<TaskEntity> {
  constructor(private dataSource: DataSource) {
    super(TaskEntity, dataSource.createEntityManager());
  }
}
