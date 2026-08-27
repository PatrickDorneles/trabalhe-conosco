import { Test, TestingModule } from '@nestjs/testing';
import { CreateHarvestService } from './create-harvest.service';
import { InsertHarvestRepository } from '../../repositories/insert-harvest/insert-harvest.repository';

describe('CreateHarvestService', () => {
  let service: CreateHarvestService;

  const mockInsertHarvestRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateHarvestService,
        { provide: InsertHarvestRepository, useValue: mockInsertHarvestRepository },
      ],
    }).compile();

    service = module.get<CreateHarvestService>(CreateHarvestService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should create a harvest', async () => {
      const dto = { year: 2024 };
      const mockHarvest = { id: '123', year: 2024 };
      mockInsertHarvestRepository.execute.mockResolvedValue(mockHarvest);

      const result = await service.execute(dto);

      expect(result).toEqual(mockHarvest);
      expect(mockInsertHarvestRepository.execute).toHaveBeenCalledWith({ year: 2024 });
    });
  });
});
