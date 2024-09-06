import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskMapper } from '../mapper/task.mapper';
import { TaskRepository } from '../repository/task.repository';
import { TaskFilterDto } from '../dto/task-filter.dto';
import { UserInterface } from '../../auth/interface/user-interface';

@Injectable()
export class TaskService {
  constructor(private repo: TaskRepository, private mapper: TaskMapper) {}

  async getAll(filter: TaskFilterDto, user: UserInterface) {
    return this.mapper.mapOverview(await this.repo.getAll(filter, user.id));
  }
  // async getOne(id: string, user: UserInterface) {
  //   return this.mapper.mapOverview(await this.repo.getOne(id, user.id));
  // }
}
