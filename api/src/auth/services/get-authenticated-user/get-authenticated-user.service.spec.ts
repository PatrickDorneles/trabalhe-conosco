import { Test, TestingModule } from '@nestjs/testing';
import { GetAuthenticatedUserService } from './get-authenticated-user.service';
import { GetUserService } from '@/user/services/get-user/get-user.service';
import { UserNotFoundException } from '@/user/errors/user-not-found.exception';

describe('GetAuthenticatedUserService', () => {
  let service: GetAuthenticatedUserService;

  const mockGetUserService = {
    getById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAuthenticatedUserService,
        { provide: GetUserService, useValue: mockGetUserService },
      ],
    }).compile();

    service = module.get<GetAuthenticatedUserService>(GetAuthenticatedUserService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const id = 'user-1';

    it('should return the user', async () => {
      const user = { id, name: 'John Doe', email: 'john@test.com', passwordHash: 'hash' };
      mockGetUserService.getById.mockResolvedValue(user);

      const result = await service.execute(id);

      expect(result).toEqual(user);
      expect(mockGetUserService.getById).toHaveBeenCalledWith(id);
    });

    it('should throw UserNotFoundException when user does not exist', async () => {
      mockGetUserService.getById.mockRejectedValue(new UserNotFoundException());

      await expect(service.execute(id)).rejects.toThrow(UserNotFoundException);
    });
  });
});