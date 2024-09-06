import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { TaskService } from '../service/task.service';
import { responseModelFactory } from '../../shared/dto/basic.dto';
import { TaskFilterDto } from '../dto/task-filter.dto';
import { UserInterface } from '../../auth/interface/user-interface';
import { GetUser } from '../../shared/decorator/get-user.decorator';

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
  async getOne(@Param('id') id: string, @GetUser() user: UserInterface) {
    return responseModelFactory({
      data: await this.service.getOne(id, user),
    });
  }
}
