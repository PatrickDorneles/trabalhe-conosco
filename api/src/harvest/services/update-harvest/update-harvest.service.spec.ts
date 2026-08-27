import { Test, TestingModule } from '@nestjs/testing';
import { UpdateHarvestService } from './update-harvest.service';
import { GetHarvestService } from '../get-harvest/get-harvest.service';
import { UpdateHarvestRepository } from '../../repositories/update-harvest/update-harvest.repository';
import { HarvestNotFoundException } from '../../errors/harvest-not-found.exception';

describe('UpdateHarvestService', () => {
  let service: UpdateHarvestService;

  const mockGetHarvestService = {
    getById: jest.fn(),
  };

  const mockUpdateHarvestRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateHarvestService,
        { provide: GetHarvestService, useValue: mockGetHarvestService },
        { provide: UpdateHarvestRepository, useValue: mockUpdateHarvestRepository },
      ],
    }).compile();

    service = module.get<UpdateHarvestService>(UpdateHarvestService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const id = 'harvest-1';
    const dto = { year: 2025 };

    it('should update harvest when found', async () => {
      const updated = { id, year: 2025 };
      mockGetHarvestService.getById.mockResolvedValue({ id });
      mockUpdateHarvestRepository.execute.mockResolvedValue(updated);

      const result = await service.execute(id, dto);

      expect(result).toEqual(updated);
      expect(mockGetHarvestService.getById).toHaveBeenCalledWith(id);
      expect(mockUpdateHarvestRepository.execute).toHaveBeenCalledWith(id, dto);
    });

    it('should throw HarvestNotFoundException when harvest does not exist', async () => {
      mockGetHarvestService.getById.mockRejectedValue(new HarvestNotFoundException());

      await expect(service.execute(id, dto)).rejects.toThrow(HarvestNotFoundException);
      expect(mockUpdateHarvestRepository.execute).not.toHaveBeenCalled();
    });
  });
});