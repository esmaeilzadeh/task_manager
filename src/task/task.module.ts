import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './controller/task.controller';
import { TaskRepository } from './repository/task.repository';
import { TaskService } from './service/task.service';
import { TaskMapper } from './mapper/task.mapper';
import { TaskEntity } from './entity/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  providers: [TaskService, TaskRepository, TaskMapper],
  controllers: [TaskController],
  exports: [TaskService, TaskRepository],
})
export class TaskModule {}
