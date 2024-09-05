import { LoginBodyDto } from '../dto/login-body.dto';
import { LoginOutputDto } from '../dto/login-output.dto';

export interface AuthServiceInterface {
  login(data: LoginBodyDto): Promise<LoginOutputDto>;
}
