import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { UserProfileDto } from '../dto/user-profile.dto';
import { TaskEntity } from '../entity/task.entity';

@Injectable()
export class TaskMapper {
  mapProfile(task: DeepPartial<TaskEntity>) {
    return {
      // title: task?.title,
      // id: task?.id,
    };
  }
}
