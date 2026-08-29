import { Test, TestingModule } from '@nestjs/testing';
import { DashboardController } from './dashboard.controller';
import { CountPropertiesByStateService } from '@/rural-property/services/count-properties-by-state/count-properties-by-state.service';
import { CountLandUseByTypeService } from '@/rural-property/services/count-land-use-by-type/count-land-use-by-type.service';
import { CountPropertiesService } from '@/rural-property/services/count-properties/count-properties.service';
import { SumTotalAreaService } from '@/rural-property/services/sum-total-area/sum-total-area.service';
import { CountProducerCropsByCropService } from '@/producer-crop/services/count-producer-crops-by-crop/count-producer-crops-by-crop.service';

describe('DashboardController', () => {
  let controller: DashboardController;

  const mockCountPropertiesService = { execute: jest.fn() };
  const mockSumTotalAreaService = { execute: jest.fn() };
  const mockCountPropertiesByStateService = { execute: jest.fn() };
  const mockCountLandUseByTypeService = { execute: jest.fn() };
  const mockCountProducerCropsByCropService = { execute: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DashboardController],
      providers: [
        { provide: CountPropertiesService, useValue: mockCountPropertiesService },
        { provide: SumTotalAreaService, useValue: mockSumTotalAreaService },
        { provide: CountPropertiesByStateService, useValue: mockCountPropertiesByStateService },
        { provide: CountLandUseByTypeService, useValue: mockCountLandUseByTypeService },
        { provide: CountProducerCropsByCropService, useValue: mockCountProducerCropsByCropService },
      ],
    }).compile();

    controller = module.get<DashboardController>(DashboardController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('summary', () => {
    it('should aggregate dashboard data', async () => {
      mockCountPropertiesService.execute.mockResolvedValue(3);
      mockSumTotalAreaService.execute.mockResolvedValue(1500.5);
      mockCountPropertiesByStateService.execute.mockResolvedValue([
        { state: 'MG', count: 2 },
      ]);
      mockCountLandUseByTypeService.execute.mockResolvedValue({
        arableArea: 900,
        vegetationArea: 300,
      });
      mockCountProducerCropsByCropService.execute.mockResolvedValue([
        { crop: 'Soja', count: 2 },
      ]);

      await expect(controller.summary()).resolves.toEqual({
        totalFarms: 3,
        totalHectares: 1500.5,
        propertiesByState: [{ state: 'MG', count: 2 }],
        landUseByType: { arableArea: 900, vegetationArea: 300 },
        plantedCropsByCrop: [{ crop: 'Soja', count: 2 }],
      });
    });
  });
});