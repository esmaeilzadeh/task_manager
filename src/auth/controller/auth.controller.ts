import {Body, Controller, Head, Post, UseGuards,} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '../guard/jwt-auth.guard';
import {AuthUserService} from '../service/auth-user.service';
import {LoginBodyDto} from '../dto/login-body.dto';
import {responseModelFactory} from '../../shared/dto/basic.dto';
import {RegisterBodyDto} from '../dto/register-body.dto';
import {JwtAuthRefreshGuard} from '../guard/jwt-auth-refresh.guard';
import {GetUser} from '../../shared/decorator/get-user.decorator';
import {UserInterface} from '../interface/user-interface';

@ApiTags('auth')
@ApiResponse({ status: 200, description: 'Successful' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiResponse({ status: 500, description: 'Internal server error' })
@Controller('v1/auth')
export class AuthController {
  constructor(
    private authService: AuthUserService,
    private configService: ConfigService,
  ) {}
  @Post('register')
  async register(@Body() input: RegisterBodyDto) {
    return responseModelFactory({
      data: await this.authService.register(input),
      statusCode: 200,
    });
  }
  @Post('login')
  async login(@Body() input: LoginBodyDto) {
    return responseModelFactory({
      data: await this.authService.login(input),
      statusCode: 200,
    });
  }
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Head('auth')
  async auth() {
    return responseModelFactory({
      data: {},
      statusCode: 200,
    });
  }
  @ApiBearerAuth('JWT-auth-refresh')
  @UseGuards(JwtAuthRefreshGuard)
  @Post('refresh')
  async refresh(@GetUser() user: UserInterface) {
    return responseModelFactory({
      data: await this.authService.refresh(user),
      statusCode: 200,
    });
  }
}
