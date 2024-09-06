import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from 'src/user/repository/user.repository';
import { JwtHelper } from '../../shared/helper/jwt.helper';
import { PasswordHelper } from '../../shared/helper/password.helper';
import { SecurityConfig } from '../../shared/interface/security-config.interface';
import { UserEntity } from '../../user/entity/user.entity';
import { LoginBodyDto } from '../dto/login-body.dto';
import { AuthServiceInterface } from '../interface/auth-service-interface';
import { LoginOutputDto } from '../dto/login-output.dto';
import { RegisterBodyDto } from '../dto/register-body.dto';
import { DeepPartial } from 'typeorm';
import { UserInterface } from '../interface/user-interface';

@Injectable()
export class AuthUserService implements AuthServiceInterface {
  constructor(
    private readonly repo: UserRepository,
    private readonly passwordHelper: PasswordHelper,
    private readonly jwtHelper: JwtHelper,
    private readonly configService: ConfigService,
  ) {}
  async register(data: RegisterBodyDto): Promise<LoginOutputDto> {
    if (await this.repo.findByEmail(data.email)) {
      throw new ConflictException('another user with this email exists.');
    }
    const user: DeepPartial<UserEntity> = await this.repo.save({
      email: data.email,
      password: await this.passwordHelper.hashPassword(data.password),
    });
    const outUser = {
      email: user.email,
      id: user.id,
    };
    return {
      accessToken: await this.getAccessToken(outUser),
      refreshToken: await this.getRefreshToken(outUser),
      user: outUser,
    };
  }
  async login(data: LoginBodyDto): Promise<LoginOutputDto> {
    const user = await this.repo.findByEmail(data.email);
    console.log('logged in user:', user);
    if (!user) {
      throw new UnauthorizedException('email or password is not correct');
    }

    if (user.blockedAt) {
      throw new UnauthorizedException('your account is blocked');
    }

    const match = await this.passwordHelper.validatePassword(
      data.password,
      user.password,
    );

    if (!match) {
      throw new UnauthorizedException('email or password is not correct');
    }
    const outUser = {
      email: user.email,
      id: user.id,
    };
    return {
      accessToken: await this.getAccessToken(outUser),
      refreshToken: await this.getRefreshToken(outUser),
      user: outUser,
    };
  }

  private async getAccessToken(user: Partial<UserEntity>) {
    const token = await this.jwtHelper.generateToken(
      user,
      this.getSecurityConfig().jwtSecret,
      this.getSecurityConfig().jwtExpiresIn,
    );
    return token.token;
  }

  private async getRefreshToken(user: Partial<UserEntity>) {
    const token = await this.jwtHelper.generateToken(
      user,
      this.getSecurityConfig().jwtSecretRefresh,
      this.getSecurityConfig().jwtExpiresIn,
    );
    return token.token;
  }

  private getSecurityConfig() {
    return this.configService.get<SecurityConfig>('security');
  }

  async refresh(user: UserInterface) {
    const userFromDb = await this.repo.findByEmail(user.email);
    if (!userFromDb || userFromDb.blockedAt) throw new UnauthorizedException();
    return {
      accessToken: await this.getAccessToken({
        email: userFromDb.email,
        id: userFromDb.id,
      }),
    };
  }
}
