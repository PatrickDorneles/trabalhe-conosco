import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AuthController } from './auth.controller';
import { SignupService } from './services/signup/signup.service';
import { SigninService } from './services/signin/signin.service';
import { GetAuthenticatedUserService } from './services/get-authenticated-user/get-authenticated-user.service';
import { UserEmailAlreadyInUseException } from './errors/user-email-already-in-use.exception';
import { InvalidCredentialsException } from './errors/invalid-credentials.exception';

describe('AuthController', () => {
  let app: INestApplication;

  const mockSignupService = {
    execute: jest.fn(),
  };

  const mockSigninService = {
    execute: jest.fn(),
  };

  const mockGetAuthenticatedUserService = {
    execute: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: SignupService, useValue: mockSignupService },
        { provide: SigninService, useValue: mockSigninService },
        { provide: GetAuthenticatedUserService, useValue: mockGetAuthenticatedUserService },
      ],
    }).compile();

    app = module.createNestApplication();
    app.use((req: { user?: { id: string } }, _res: any, next: () => void) => {
      req.user = { id: 'user-1' };
      next();
    });
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /auth/signup', () => {
    const dto = { email: 'test@test.com', password: '12345678', name: 'John' };

    it('should return 201 with user output', async () => {
      const mockUser = { name: 'John', email: 'test@test.com' };
      mockSignupService.execute.mockResolvedValue(mockUser);

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(dto)
        .expect(201);

      expect(response.body).toEqual(mockUser);
      expect(mockSignupService.execute).toHaveBeenCalledWith(dto);
    });

    it('should return 400 when email is already taken', async () => {
      mockSignupService.execute.mockRejectedValue(new UserEmailAlreadyInUseException());

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(dto)
        .expect(400);

      expect(response.body.message).toBe('auth.user-email-already-in-use');
    });
  });

  describe('POST /auth/signin', () => {
    const dto = { email: 'test@test.com', password: '12345678' };

    it('should return 201 with accessToken', async () => {
      const mockOutput = { accessToken: 'jwt-token' };
      mockSigninService.execute.mockResolvedValue(mockOutput);

      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send(dto)
        .expect(201);

      expect(response.body).toEqual(mockOutput);
      expect(mockSigninService.execute).toHaveBeenCalledWith(dto);
    });

    it('should return 401 on invalid credentials', async () => {
      mockSigninService.execute.mockRejectedValue(new InvalidCredentialsException());

      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send(dto)
        .expect(401);

      expect(response.body.message).toBe('auth.invalid-credentials');
    });
  });

  describe('GET /auth/me', () => {
    it('should return authenticated user info', async () => {
      const mockUser = { name: 'John', email: 'test@test.com' };
      mockGetAuthenticatedUserService.execute.mockResolvedValue(mockUser);

      const response = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', 'Bearer token')
        .expect(200);

      expect(response.body).toEqual(mockUser);
      expect(mockGetAuthenticatedUserService.execute).toHaveBeenCalledWith('user-1');
    });
  });
});
