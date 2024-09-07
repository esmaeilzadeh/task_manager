import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { TaskService } from '../service/task.service';
import { responseModelFactory } from '../../shared/dto/basic.dto';
import { TaskFilterDto } from '../dto/task-filter.dto';
import { UserInterface } from '../../auth/interface/user-interface';
import { GetUser } from '../../shared/decorator/get-user.decorator';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import {UUIDParam} from "../../shared/interceptor/UUID-Param";
@ApiTags('users')
@ApiResponse({ status: 200, description: 'Successful' })
@ApiResponse({ status: 500, description: 'Internal server error' })
@ApiResponse({ status: 403, description: 'Invalid credentials' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('v1/tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}
  @Get('')
  async getAll(
    @Query() filters: TaskFilterDto,
    @GetUser() user: UserInterface,
  ) {
    return responseModelFactory({
      data: await this.service.getAll(filters, user),
    });
  }
  @Get(':id')
  async getOne(@UUIDParam('id') id: string, @GetUser() user: UserInterface) {
    return responseModelFactory({
      data: await this.service.getOne(id, user),
    });
  }
  @Post('')
  async create(@Body() input: CreateTaskDto, @GetUser() user: UserInterface) {
    return responseModelFactory({
      data: await this.service.create(input, user),
      message: 'task created successfully.',
    });
  }
  @Patch(':id')
  async update(
      @UUIDParam('id')  id: string,
    @Body() input: UpdateTaskDto,
    @GetUser() user: UserInterface,
  ) {
    return responseModelFactory({
      data: await this.service.update(id, input, user),
      message: 'task updated successfully.',
    });
  }
  @ApiQuery({ name: 'hard', type: Boolean, required: false })
  @Delete(':id')
  async delete(
      @UUIDParam('id') id: string,
    @GetUser() user: UserInterface,
    @Query('hard') hard:boolean = false,
  ) {
    await this.service.delete(id, user, hard);
    return responseModelFactory({
      data: {},
      message: 'task deleted successfully.',
    });
  }
}
