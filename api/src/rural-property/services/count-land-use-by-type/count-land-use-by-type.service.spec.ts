import { Test, TestingModule } from '@nestjs/testing';
import { CountLandUseByTypeService } from './count-land-use-by-type.service';
import { CountLandUseByTypeRepository } from '../../repositories/count-land-use-by-type.repository';

describe('CountLandUseByTypeService', () => {
  let service: CountLandUseByTypeService;

  const mockCountLandUseByTypeRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountLandUseByTypeService,
        {
          provide: CountLandUseByTypeRepository,
          useValue: mockCountLandUseByTypeRepository,
        },
      ],
    }).compile();

    service = module.get<CountLandUseByTypeService>(CountLandUseByTypeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return the land use by type', async () => {
      const result = { arableArea: 800.25, vegetationArea: 200.5 };
      mockCountLandUseByTypeRepository.execute.mockResolvedValue(result);

      await expect(service.execute()).resolves.toEqual(result);
      expect(mockCountLandUseByTypeRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});
