// import { AppConfigInterface } from '../src/shared/interface/config.interface';
// import { EnvEnum } from '../src/shared/enum/env.enum';
import * as process from 'process';
import { AppConfigInterface } from '../src/shared/interface/config.interface';
import { EnvEnum } from '../src/shared/enum/env.enum';
// import {DataSourceOptions} from "typeorm";
export const testConfig: AppConfigInterface = {
  typeOrm: {
    type: 'postgres',
    host: process.env.POSTGRES_TEST_DB_HOST || '127.0.0.1',
    port: parseInt(process.env.POSTGRES_TEST_DB_PORT) || 5432,
    username: process.env.POSTGRES_TEST_DB_USER || 'postgres',
    password: process.env.POSTGRES_TEST_DB_PASSWORD || 'postgres',
    database: process.env.POSTGRES_TEST_DB_DATABASE || 'test_db',
    // autoLoadEntities: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/migrations/*{.ts,.js}'],
    logging: true,
    // retryAttempts: 1,
  },
  environment: <EnvEnum>process.env.NODE_ENV || EnvEnum.DEVELOPMENT,
  security: {
    jwtSecret: process.env.JWT_SECRET || 'JWT_SECRET',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    jwtSecretRefresh: process.env.JWT_SECRET_REFRESH || 'JWT_SECRET_REFRESH',
    jwtExpiresInRefresh: process.env.JWT_EXPIRES_IN_REFRESH || '3d',
    bcryptSaltOrRound: parseInt(process.env.BCRYPT_ROUND) || 10,
  },
};

export default (): AppConfigInterface => testConfig;
