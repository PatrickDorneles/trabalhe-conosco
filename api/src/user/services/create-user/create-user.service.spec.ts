import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create-user.service';
import { InsertUserRepository } from 'src/user/repositories/insert-user.repository';
import { hash } from 'bcrypt';

jest.mock('bcrypt');

describe('CreateUserService', () => {
  let service: CreateUserService;

  const mockInsertUserRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        { provide: InsertUserRepository, useValue: mockInsertUserRepository },
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    const dto = { email: 'test@test.com', password: 'mypassword', name: 'John' };

    it('should hash password and create user', async () => {
      const hashedPassword = 'hashed-password';
      (hash as jest.Mock).mockResolvedValue(hashedPassword);
      const mockUser = { id: '123', name: 'John', email: 'test@test.com', passwordHash: hashedPassword };
      mockInsertUserRepository.execute.mockResolvedValue(mockUser);

      const result = await service.createUser(dto);

      expect(hash).toHaveBeenCalledWith('mypassword', 10);
      expect(mockInsertUserRepository.execute).toHaveBeenCalledWith({
        name: 'John',
        email: 'test@test.com',
        passwordHash: hashedPassword,
      });
      expect(result).toEqual(mockUser);
    });

    it('should not store plain text password', async () => {
      (hash as jest.Mock).mockResolvedValue('hashed');
      mockInsertUserRepository.execute.mockResolvedValue({});

      await service.createUser(dto);

      const calledWith = mockInsertUserRepository.execute.mock.calls[0][0];
      expect(calledWith.passwordHash).not.toBe('mypassword');
    });
  });
});
