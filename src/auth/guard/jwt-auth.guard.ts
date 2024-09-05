import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AbstractJwtGuard } from './abstract-jwt.guard';
import { SecurityConfig } from '../../shared/interface/security-config.interface';

@Injectable()
export class JwtAuthGuard extends AbstractJwtGuard {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly configService: ConfigService,
  ) {
    super();
    return this;
  }
  protected getSecretKey() {
    return this.configService.get<SecurityConfig>('security').jwtSecret;
  }
}
