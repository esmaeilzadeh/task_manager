import * as dotenv from 'dotenv';
import * as process from 'process';
import { DataSourceOptions } from 'typeorm';
dotenv.config();

export function typeormConfig() {
  return {
    type: 'postgres',
    host: process.env.POSTGRES_DB_HOST || '127.0.0.1',
    port: process.env.POSTGRES_DB_PORT || 5432,
    username: process.env.POSTGRES_DB_USER || 'postgres',
    password: process.env.POSTGRES_DB_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB_DATABASE || 'base-db',
    autoLoadEntities: true,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrationsRun: true,
    migrations: ['dist/migrations/*{.ts,.js}'],
    logging: true,
    retryAttempts: 1,
  } as DataSourceOptions;
}
