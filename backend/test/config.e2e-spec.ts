import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Config & CORS (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableCors({ origin: '*' });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET) still returns "Hello World!" with the new config/CORS wiring in place', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/ (GET) allows cross-origin requests from any origin', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('Origin', 'http://localhost:3000')
      .expect(200)
      .expect('access-control-allow-origin', '*');
  });
});
