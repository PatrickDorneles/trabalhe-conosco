import { Test, TestingModule } from '@nestjs/testing';
import { CreateProducerCropService } from './create-producer-crop.service';
import { InsertProducerCropRepository } from '../../repositories/insert-producer-crop/insert-producer-crop.repository';
import { GetPropertyService } from '@/rural-property/services/get-property/get-property.service';
import { GetHarvestService } from '@/harvest/services/get-harvest/get-harvest.service';
import { CreateCropService } from '@/crop/services/create-crop/create-crop.service';
import { PropertyNotFoundException } from '@/rural-property/errors/property-not-found.exception';
import { HarvestNotFoundException } from '@/harvest/errors/harvest-not-found.exception';

describe('CreateProducerCropService', () => {
  let service: CreateProducerCropService;

  const mockInsertProducerCropRepository = {
    execute: jest.fn(),
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
        CreateProducerCropService,
        {
          provide: InsertProducerCropRepository,
          useValue: mockInsertProducerCropRepository,
        },
        { provide: GetPropertyService, useValue: mockGetPropertyService },
        { provide: GetHarvestService, useValue: mockGetHarvestService },
        { provide: CreateCropService, useValue: mockCreateCropService },
      ],
    }).compile();

    service = module.get<CreateProducerCropService>(CreateProducerCropService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const dto = {
      ruralPropertyId: 'property-1',
      harvestId: 'harvest-1',
      cropName: 'Soja',
    };

    it('should link property, harvest and crop', async () => {
      const property = { id: 'property-1', farmName: 'Fazenda Boa Vista' };
      const harvest = { id: 'harvest-1', year: 2024 };
      const crop = { id: 'crop-1', name: 'Soja' };
      const producerCrop = {
        id: 'producer-crop-1',
        ruralProperty: property,
        harvest,
        crop,
      };

      mockGetPropertyService.getById.mockResolvedValue(property);
      mockGetHarvestService.getById.mockResolvedValue(harvest);
      mockCreateCropService.execute.mockResolvedValue(crop);
      mockInsertProducerCropRepository.execute.mockResolvedValue(producerCrop);

      const result = await service.execute(dto);

      expect(result).toEqual(producerCrop);
      expect(mockGetPropertyService.getById).toHaveBeenCalledWith('property-1');
      expect(mockGetHarvestService.getById).toHaveBeenCalledWith('harvest-1');
      expect(mockCreateCropService.execute).toHaveBeenCalledWith({ name: 'Soja' });
      expect(mockInsertProducerCropRepository.execute).toHaveBeenCalledWith({
        ruralProperty: property,
        harvest,
        crop,
      });
    });

    it('should propagate PropertyNotFoundException when property is missing', async () => {
      mockGetPropertyService.getById.mockRejectedValue(new PropertyNotFoundException());

      await expect(service.execute(dto)).rejects.toThrow(PropertyNotFoundException);
      expect(mockGetHarvestService.getById).not.toHaveBeenCalled();
    });

    it('should propagate HarvestNotFoundException when harvest is missing', async () => {
      const property = { id: 'property-1', farmName: 'Fazenda Boa Vista' };
      mockGetPropertyService.getById.mockResolvedValue(property);
      mockGetHarvestService.getById.mockRejectedValue(new HarvestNotFoundException());

      await expect(service.execute(dto)).rejects.toThrow(HarvestNotFoundException);
      expect(mockCreateCropService.execute).not.toHaveBeenCalled();
    });
  });
});