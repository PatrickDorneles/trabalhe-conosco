import { Test, TestingModule } from '@nestjs/testing';
import { SignupService } from './signup.service';
import { CreateUserService } from 'src/user/services/create-user/create-user.service';
import { GetUserService } from 'src/user/services/get-user/get-user.service';
import { UserEmailAlreadyClaimedException } from 'src/auth/errors/user-email-already-claimed.exception';
import { UserNotFoundException } from 'src/user/errors/user-not-found.exception';

describe('SignupService', () => {
  let service: SignupService;

  const mockCreateUserService = {
    createUser: jest.fn(),
  };

  const mockGetUserService = {
    getByEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SignupService,
        { provide: CreateUserService, useValue: mockCreateUserService },
        { provide: GetUserService, useValue: mockGetUserService },
      ],
    }).compile();

    service = module.get<SignupService>(SignupService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const dto = { email: 'test@test.com', password: '12345678', name: 'John' };

    it('should create user when email is available', async () => {
      const mockUser = { id: '123', name: 'John', email: 'test@test.com' };
      mockGetUserService.getByEmail.mockRejectedValue(new UserNotFoundException());
      mockCreateUserService.createUser.mockResolvedValue(mockUser);

      const result = await service.execute(dto);

      expect(result).toEqual(mockUser);
      expect(mockGetUserService.getByEmail).toHaveBeenCalledWith('test@test.com');
      expect(mockCreateUserService.createUser).toHaveBeenCalledWith(dto);
    });

    it('should throw UserEmailAlreadyClaimedException when email already exists', async () => {
      const existingUser = { id: '999', name: 'Jane', email: 'test@test.com' };
      mockGetUserService.getByEmail.mockResolvedValue(existingUser);

      await expect(service.execute(dto)).rejects.toThrow(UserEmailAlreadyClaimedException);
      expect(mockCreateUserService.createUser).not.toHaveBeenCalled();
    });
  });
});
