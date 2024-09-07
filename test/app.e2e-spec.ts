import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserModule } from '../src/user/user.module';
import { AuthModule } from '../src/auth/auth.module';
import { CreateTaskDto } from '../src/task/dto/create-task.dto';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../src/config/typeorm.config';
import testConfig from './testConfig';

describe('TaskController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [() => testConfig()],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: () => typeormConfig(),
        }),
        ,
        UserModule,
        AuthModule,
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });
  let accessToken: string;
  let userId: string;
  const taskData: CreateTaskDto = {
    title: 'task 1',
    description: 'task 1 desc',
  };

  it('register then create a post', () => {
    //@todo refactor user and accessToken as prefix
    return request(app.getHttpServer())
      .post('/v1/auth/register')
      .send({
        email: 'esmailzadeh@gmail.com',
        password: '111213Abc!',
      })
      .then(async (res: request.Response) => {
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('data.accessToken');
        expect(res.body).toHaveProperty('data.refreshToken');
        expect(res.body).toHaveProperty('data.user.id');
        expect(res.body).toHaveProperty(
          'data.user.email',
          'esmailzadeh@gmail.com',
        );
        accessToken = res.body.data.accessToken;
        userId = res.body.data.user.id;
      })
      .then(() => {
        return request(app.getHttpServer())
          .post('/v1/tasks')
          .auth(accessToken, { type: 'bearer' })
          .send(taskData)
          .expect(201);
      })
      .then(async (res: request.Response) => {
        expect(res.status).toEqual(201);
        expect(res.body).toHaveProperty('data.title', taskData.title);
        expect(res.body).toHaveProperty(
          'data.description',
          taskData.description,
        );
        expect(res.body).toHaveProperty('data.id');
        expect(res.body).toHaveProperty('data.completed');
      });
  });
});
