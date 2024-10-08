import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskMapper } from '../mapper/task.mapper';
import { TaskRepository } from '../repository/task.repository';
import { TaskFilterDto } from '../dto/task-filter.dto';
import { UserInterface } from '../../auth/interface/user-interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { IsNull, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(private repo: TaskRepository, private mapper: TaskMapper) {}

  async getAll(filter: TaskFilterDto, user: UserInterface) {
    return this.mapper.mapOverview(await this.repo.getAll(filter, user.id));
  }
  async getOne(id: string, user: UserInterface) {
    const task = await this.repo.getOne(id, user.id);
    if (!task) throw new NotFoundException();
    return this.mapper.mapDetail(task);
  }

  async create(input: CreateTaskDto, user: UserInterface) {
    return this.mapper.mapDetail(
      await this.repo.save({
        userId: user.id,
        title: input.title,
        description: input.description,
      }),
    );
  }
  async update(id: string, input: UpdateTaskDto, user: UserInterface) {
    const updateResult = await this.repo.update(
      {
        userId: user.id,
        id: id,
      },
      {
        title: input.title,
        description: input.description,
        completed: input.completed,
      },
    );
    if (!updateResult.affected) throw new NotFoundException();
    return this.getOne(id, user);
  }
  async delete(id: string, user: UserInterface, hard: boolean) {
    let result: UpdateResult | DeleteResult;
    if (hard) {
      result = await this.repo.delete({
        userId: user.id,
        id: id,
      });
    } else {
      result = await this.repo.softDelete({
        userId: user.id,
        id: id,
        deletedAt: IsNull(),
      });
    }
    if (!result.affected) throw new NotFoundException();
  }
}
