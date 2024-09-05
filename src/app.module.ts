import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import appConfig from './config/app.config';
import { typeormConfig } from './config/typeorm.config';
import { ExceptionHandler } from './shared/handler/exception.handler';
import { SharedModule } from './shared/shared.module';
import { SmsModule } from './sms/sms.module';
import { UserModule } from './user/user.module';
import {AuthModule} from "./auth/auth.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => typeormConfig(),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    SharedModule,
    UserModule,
      AuthModule,
    SmsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionHandler,
    },
  ],
})
export class AppModule {}
