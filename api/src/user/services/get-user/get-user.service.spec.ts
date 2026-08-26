import { Test, TestingModule } from '@nestjs/testing';
import { GetUserService } from './get-user.service';
import { SelectUserByIdRepository } from 'src/user/repositories/select-user-by-id.repository';
import { SelectUserByEmailRepository } from 'src/user/repositories/select-user-by-email.repository';
import { UserNotFoundException } from 'src/user/errors/user-not-found.exception';

describe('GetUserService', () => {
  let service: GetUserService;

  const mockSelectUserByIdRepository = {
    execute: jest.fn(),
  };

  const mockSelectUserByEmailRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUserService,
        { provide: SelectUserByIdRepository, useValue: mockSelectUserByIdRepository },
        { provide: SelectUserByEmailRepository, useValue: mockSelectUserByEmailRepository },
      ],
    }).compile();

    service = module.get<GetUserService>(GetUserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return a user when found', async () => {
      const mockUser = { id: '123', name: 'John', email: 'john@test.com' };
      mockSelectUserByIdRepository.execute.mockResolvedValue(mockUser);

      const result = await service.getById('123');

      expect(result).toEqual(mockUser);
      expect(mockSelectUserByIdRepository.execute).toHaveBeenCalledWith('123');
    });

    it('should throw UserNotFoundException when user not found', async () => {
      mockSelectUserByIdRepository.execute.mockResolvedValue(null);

      await expect(service.getById('999')).rejects.toThrow(UserNotFoundException);
    });
  });

  describe('getByEmail', () => {
    it('should return a user when found', async () => {
      const mockUser = { id: '123', name: 'John', email: 'john@test.com' };
      mockSelectUserByEmailRepository.execute.mockResolvedValue(mockUser);

      const result = await service.getByEmail('john@test.com');

      expect(result).toEqual(mockUser);
      expect(mockSelectUserByEmailRepository.execute).toHaveBeenCalledWith('john@test.com');
    });

    it('should throw UserNotFoundException when user not found', async () => {
      mockSelectUserByEmailRepository.execute.mockResolvedValue(null);

      await expect(service.getByEmail('notfound@test.com')).rejects.toThrow(UserNotFoundException);
    });
  });
});
