import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { TaskEntity } from '../entity/task.entity';

@Injectable()
export class TaskMapper {
  mapDetail(task: DeepPartial<TaskEntity>) {
    return {
      id: task?.id,
      title: task?.title,
      description: task?.description,
      completed: task?.completed,
      createdAt: task?.createdAt,
      updatedAt: task?.updatedAt,
    };
  }
  mapOverview(tasks: DeepPartial<TaskEntity>[]) {
    return tasks.map((task) => {
      return {
        id: task?.id,
        title: task?.title,
        createAt: task?.createdAt,
      };
    });
  }
}
