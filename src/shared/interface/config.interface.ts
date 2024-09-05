import { DataSourceOptions } from 'typeorm';
import { OtpConfig } from './otp-config.interface';
import { SecurityConfig } from './security-config.interface';
import { RedisConfigInterface } from './redis-config.interface';
import { PlatformConfigInterface } from './platform-config.inteface';
import { EnvEnum } from '../enum/env.enum';

export interface AppConfigInterface {
  security: SecurityConfig;
  typeOrm: DataSourceOptions;
  environment: EnvEnum;
  redis: RedisConfigInterface;
}
