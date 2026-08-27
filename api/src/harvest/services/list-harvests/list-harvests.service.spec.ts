import { Test, TestingModule } from '@nestjs/testing';
import { ListHarvestsService } from './list-harvests.service';
import { SelectAllHarvestsRepository } from '../../repositories/select-all-harvests/select-all-harvests.repository';

describe('ListHarvestsService', () => {
  let service: ListHarvestsService;

  const mockSelectAllHarvestsRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListHarvestsService,
        { provide: SelectAllHarvestsRepository, useValue: mockSelectAllHarvestsRepository },
      ],
    }).compile();

    service = module.get<ListHarvestsService>(ListHarvestsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return paginated harvests', async () => {
      const pagination = { page: 1, limit: 10 };
      const mockOutput = {
        data: [{ id: '1', year: 2024 }],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      };
      mockSelectAllHarvestsRepository.execute.mockResolvedValue(mockOutput);

      const result = await service.execute(pagination);

      expect(result).toEqual(mockOutput);
      expect(mockSelectAllHarvestsRepository.execute).toHaveBeenCalledWith(pagination);
    });
  });
});
