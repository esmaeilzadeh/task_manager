import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/v1/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/v1/auth/register').send({
          email:"esmailzadeh@gmail.com",
          password:"111213Abc!"
        })
      .expect(200,(err,res)=>{
          expect(res.body)
              .toHaveProperty('accessToken')
          expect(res.body)
              .toHaveProperty('refreshToken')
          expect(res.body)
              .toHaveProperty('user.id','esmailzadeh@gmail.com')
          expect(res.body)
              .toHaveProperty('user.email','esmailzadeh@gmail.com')
      })
  });
});
