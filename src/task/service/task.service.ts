import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskMapper } from '../mapper/task.mapper';
import { TaskRepository } from '../repository/task.repository';
import { TaskFilterDto } from '../dto/task-filter.dto';

@Injectable()
export class TaskService {
  constructor(private repo: TaskRepository, private mapper: TaskMapper) {}

  async getAll(filter: TaskFilterDto) {
    this.repo.find({
      where: {},
    });
  }
}
