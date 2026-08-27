import { Test, TestingModule } from '@nestjs/testing';
import { GetHarvestService } from './get-harvest.service';
import { SelectHarvestByIdRepository } from '../../repositories/select-harvest-by-id/select-harvest-by-id.repository';
import { HarvestNotFoundException } from '../../errors/harvest-not-found.exception';

describe('GetHarvestService', () => {
  let service: GetHarvestService;

  const mockSelectHarvestByIdRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetHarvestService,
        { provide: SelectHarvestByIdRepository, useValue: mockSelectHarvestByIdRepository },
      ],
    }).compile();

    service = module.get<GetHarvestService>(GetHarvestService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return a harvest when found', async () => {
      const mockHarvest = { id: '123', year: 2024 };
      mockSelectHarvestByIdRepository.execute.mockResolvedValue(mockHarvest);

      const result = await service.getById('123');

      expect(result).toEqual(mockHarvest);
      expect(mockSelectHarvestByIdRepository.execute).toHaveBeenCalledWith('123');
    });

    it('should throw HarvestNotFoundException when harvest not found', async () => {
      mockSelectHarvestByIdRepository.execute.mockResolvedValue(null);

      await expect(service.getById('999')).rejects.toThrow(HarvestNotFoundException);
    });
  });
});
