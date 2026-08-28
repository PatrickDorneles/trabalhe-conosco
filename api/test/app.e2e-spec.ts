import { Test, TestingModule } from '@nestjs/testing';
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import request from 'supertest';
import { config } from 'dotenv';

config({ path: '.env.test' });

import { AppModule } from '../src/app.module';
import { JwtAuthGuard } from '../src/auth/guards/jwt-auth.guard';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
    await app.init();
  }, 30_000);

  afterAll(async () => {
    await app.close();
  });

  describe('POST /auth/signup', () => {
    const dto = { name: 'John Doe', email: 'john@test.com', password: '12345678' };

    it('should create a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('name', dto.name);
      expect(response.body).toHaveProperty('email', dto.email);
    });

    it('should return 400 when email is already in use', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBe('auth.user-email-already-in-use');
    });

    it('should return 400 when name is missing', async () => {
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send({ email: 'other@test.com', password: '12345678' })
        .expect(400);
    });
  });

  describe('POST /auth/signin', () => {
    const dto = { email: 'john@test.com', password: '12345678' };

    it('should return an access token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send(dto)
        .expect(201);

      expect(response.body).toHaveProperty('accessToken');
      expect(typeof response.body.accessToken).toBe('string');
    });

    it('should return 401 on invalid credentials', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'john@test.com', password: 'wrongpassword' })
        .expect(401);

      expect(response.body.message).toBe('auth.invalid-credentials');
    });
  });

  describe('GET /auth/me', () => {
    let accessToken: string;

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'john@test.com', password: '12345678' });

      accessToken = response.body.accessToken;
    });

    it('should return authenticated user info', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('email', 'john@test.com');
      expect(response.body).not.toHaveProperty('passwordHash');
    });

    it('should return 401 when not authenticated', async () => {
      await request(app.getHttpServer())
        .get('/auth/me')
        .expect(401);
    });
  });

  describe('POST /producers', () => {
    let accessToken: string;

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({ email: 'john@test.com', password: '12345678' });

      accessToken = response.body.accessToken;
    });

    it('should create a producer when authenticated', async () => {
      const response = await request(app.getHttpServer())
        .post('/producer')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Fazenda Boa Vista', document: '12345678909' })
        .expect(201);

      expect(response.body).toHaveProperty('name', 'Fazenda Boa Vista');
      expect(response.body).toHaveProperty('document', '12345678909');
    });

    it('should return 401 when not authenticated', async () => {
      await request(app.getHttpServer())
        .post('/producer')
        .send({ name: 'Fazenda Sem Auth', document: '98765432100' })
        .expect(401);
    });

    it('should return 409 when document is already in use', async () => {
      const response = await request(app.getHttpServer())
        .post('/producer')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Outra Fazenda', document: '12345678909' })
        .expect(409);

      expect(response.body.message).toBe('producers.document-already-exists');
    });

    it('should return 400 when document is invalid', async () => {
      await request(app.getHttpServer())
        .post('/producer')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Fazenda Inválida', document: '123' })
        .expect(400);
    });
  });
});
