import { Test, TestingModule } from '@nestjs/testing';
import { SigninService } from './signin.service';
import { GetUserService } from 'src/user/services/get-user/get-user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';

jest.mock('bcrypt');

describe('SigninService', () => {
  let service: SigninService;

  const mockGetUserService = {
    getByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SigninService,
        { provide: GetUserService, useValue: mockGetUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<SigninService>(SigninService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const dto = { email: 'test@test.com', password: 'mypassword' };
    const mockUser = {
      id: '123',
      name: 'John',
      email: 'test@test.com',
      passwordHash: 'hashed-password',
    };

    it('should return accessToken on valid credentials', async () => {
      mockGetUserService.getByEmail.mockResolvedValue(mockUser);
      (compare as jest.Mock).mockResolvedValue(true);
      mockJwtService.sign.mockReturnValue('jwt-token');

      const result = await service.execute(dto);

      expect(result).toEqual({ accessToken: 'jwt-token' });
      expect(mockGetUserService.getByEmail).toHaveBeenCalledWith('test@test.com');
      expect(compare).toHaveBeenCalledWith('mypassword', 'hashed-password');
      expect(mockJwtService.sign).toHaveBeenCalledWith({ sub: '123', email: 'test@test.com' });
    });

    it('should throw UnauthorizedException when user not found', async () => {
      mockGetUserService.getByEmail.mockRejectedValue(new Error());

      await expect(service.execute(dto)).rejects.toThrow(UnauthorizedException);
      expect(compare).not.toHaveBeenCalled();
      expect(mockJwtService.sign).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedException when password does not match', async () => {
      mockGetUserService.getByEmail.mockResolvedValue(mockUser);
      (compare as jest.Mock).mockResolvedValue(false);

      await expect(service.execute(dto)).rejects.toThrow(UnauthorizedException);
      expect(mockJwtService.sign).not.toHaveBeenCalled();
    });
  });
});
