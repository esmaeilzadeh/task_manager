import { AppConfigInterface } from '../shared/interface/config.interface';
import * as process from 'process';
import { typeormConfig } from './typeorm.config';
import { EnvEnum } from '../shared/enum/env.enum';
export const appConfig: AppConfigInterface = {
  typeOrm: typeormConfig(),
  environment: <EnvEnum>process.env.NODE_ENV || EnvEnum.DEVELOPMENT,
  security: {
    jwtSecret: process.env.JWT_SECRET || 'JWT_SECRET',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    jwtSecretRefresh: process.env.JWT_SECRET_REFRESH || 'JWT_SECRET_REFRESH',
    jwtExpiresInRefresh: process.env.JWT_EXPIRES_IN_REFRESH || '3d',
    bcryptSaltOrRound: parseInt(process.env.BCRYPT_ROUND) || 10,
  },
  redis: {
    password: process.env.REDIS_PASSWORD || '',
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    db: parseInt(process.env.REDIS_DB) || 1,
  },
};
export default (): AppConfigInterface => appConfig;
