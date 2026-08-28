import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { UpdateProducerCropService } from './update-producer-crop.service';
import { GetProducerCropService } from '../get-producer-crop/get-producer-crop.service';
import { GetPropertyService } from '@/rural-property/services/get-property/get-property.service';
import { GetHarvestService } from '@/harvest/services/get-harvest/get-harvest.service';
import { CreateCropService } from '@/crop/services/create-crop/create-crop.service';
import { UpdateProducerCropRepository } from '../../repositories/update-producer-crop/update-producer-crop.repository';
import { ProducerCropNotFoundException } from '../../errors/producer-crop-not-found.exception';

describe('UpdateProducerCropService', () => {
  let service: UpdateProducerCropService;

  const mockUpdateProducerCropRepository = {
    execute: jest.fn(),
  };

  const mockGetProducerCropService = {
    getById: jest.fn(),
  };

  const mockGetPropertyService = {
    getById: jest.fn(),
  };

  const mockGetHarvestService = {
    getById: jest.fn(),
  };

  const mockCreateCropService = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProducerCropService,
        {
          provide: UpdateProducerCropRepository,
          useValue: mockUpdateProducerCropRepository,
        },
        { provide: GetProducerCropService, useValue: mockGetProducerCropService },
        { provide: GetPropertyService, useValue: mockGetPropertyService },
        { provide: GetHarvestService, useValue: mockGetHarvestService },
        { provide: CreateCropService, useValue: mockCreateCropService },
      ],
    }).compile();

    service = module.get<UpdateProducerCropService>(UpdateProducerCropService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const id = 'producer-crop-1';

    it('should update fields when provided', async () => {
      const dto = { cropName: 'Café' };
      const crop = { id: 'crop-9', name: 'Café' };
      const updated = { id, crop };

      mockGetProducerCropService.getById.mockResolvedValue({ id });
      mockCreateCropService.execute.mockResolvedValue(crop);
      mockUpdateProducerCropRepository.execute.mockResolvedValue(updated);

      const result = await service.execute(id, dto);

      expect(result).toEqual(updated);
      expect(mockGetProducerCropService.getById).toHaveBeenCalledWith(id);
      expect(mockCreateCropService.execute).toHaveBeenCalledWith({ name: 'Café' });
      expect(mockUpdateProducerCropRepository.execute).toHaveBeenCalledWith(id, { crop });
    });

    it('should resolve and update property and harvest', async () => {
      const dto = { ruralPropertyId: 'property-2', harvestId: 'harvest-2' };
      const property = { id: 'property-2' };
      const harvest = { id: 'harvest-2' };

      mockGetProducerCropService.getById.mockResolvedValue({ id });
      mockGetPropertyService.getById.mockResolvedValue(property);
      mockGetHarvestService.getById.mockResolvedValue(harvest);
      mockUpdateProducerCropRepository.execute.mockResolvedValue({ id });

      await service.execute(id, dto);

      expect(mockGetPropertyService.getById).toHaveBeenCalledWith('property-2');
      expect(mockGetHarvestService.getById).toHaveBeenCalledWith('harvest-2');
      expect(mockUpdateProducerCropRepository.execute).toHaveBeenCalledWith(id, {
        ruralProperty: property,
        harvest,
      });
    });

    it('should throw ProducerCropNotFoundException when not found', async () => {
      mockGetProducerCropService.getById.mockRejectedValue(new ProducerCropNotFoundException());

      await expect(service.execute(id, { cropName: 'Café' })).rejects.toThrow(ProducerCropNotFoundException);
      expect(mockUpdateProducerCropRepository.execute).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when no fields are provided', async () => {
      mockGetProducerCropService.getById.mockResolvedValue({ id });

      await expect(service.execute(id, {})).rejects.toThrow(BadRequestException);
      expect(mockUpdateProducerCropRepository.execute).not.toHaveBeenCalled();
    });
  });
});