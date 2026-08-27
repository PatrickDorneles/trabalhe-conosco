import { Test, TestingModule } from '@nestjs/testing';
import { DeleteHarvestService } from './delete-harvest.service';
import { GetHarvestService } from '../get-harvest/get-harvest.service';
import { DeleteHarvestRepository } from '../../repositories/delete-harvest/delete-harvest.repository';
import { HarvestNotFoundException } from '../../errors/harvest-not-found.exception';

describe('DeleteHarvestService', () => {
  let service: DeleteHarvestService;

  const mockGetHarvestService = {
    getById: jest.fn(),
  };

  const mockDeleteHarvestRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteHarvestService,
        { provide: GetHarvestService, useValue: mockGetHarvestService },
        { provide: DeleteHarvestRepository, useValue: mockDeleteHarvestRepository },
      ],
    }).compile();

    service = module.get<DeleteHarvestService>(DeleteHarvestService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should delete harvest when found', async () => {
      mockGetHarvestService.getById.mockResolvedValue({ id: '123', year: 2024 });
      mockDeleteHarvestRepository.execute.mockResolvedValue(undefined);

      await service.execute('123');

      expect(mockGetHarvestService.getById).toHaveBeenCalledWith('123');
      expect(mockDeleteHarvestRepository.execute).toHaveBeenCalledWith('123');
    });

    it('should throw HarvestNotFoundException when harvest does not exist', async () => {
      mockGetHarvestService.getById.mockRejectedValue(new HarvestNotFoundException());

      await expect(service.execute('999')).rejects.toThrow(HarvestNotFoundException);
      expect(mockDeleteHarvestRepository.execute).not.toHaveBeenCalled();
    });
  });
});