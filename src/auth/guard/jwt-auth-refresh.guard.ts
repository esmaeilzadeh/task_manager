import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SecurityConfig } from '../../shared/interface/security-config.interface';
import { AbstractJwtGuard } from './abstract-jwt.guard';

@Injectable()
export class JwtAuthRefreshGuard extends AbstractJwtGuard {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly configService: ConfigService,
  ) {
    super();
    return this;
  }
  protected getSecretKey() {
    return this.configService.get<SecurityConfig>('security').jwtSecretRefresh;
  }
}
