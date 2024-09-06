import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { UserService } from '../service/user.service';

@ApiTags('users')
@ApiResponse({ status: 200, description: 'Successful' })
@ApiResponse({ status: 500, description: 'Internal server error' })
@ApiResponse({ status: 403, description: 'Invalid credentials' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
