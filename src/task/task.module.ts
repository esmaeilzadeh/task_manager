import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './controller/task.controller';
import { TaskRepository } from './repository/task.repository';
import { TaskService } from './service/task.service';
import { TaskMapper } from './mapper/task.mapper';
import { TaskEntity } from './entity/task.entity';
import { SharedModule } from '../shared/shared.module';
import { PaginationHelper } from '../shared/helper/pagination.helper';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskService, TaskRepository, TaskMapper, PaginationHelper],
  controllers: [TaskController],
  exports: [TaskService, TaskRepository],
})
export class TaskModule {}
