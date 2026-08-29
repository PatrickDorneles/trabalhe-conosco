import { Test, TestingModule } from '@nestjs/testing';
import { CountProducerCropsByCropService } from './count-producer-crops-by-crop.service';
import { CountProducerCropsByCropRepository } from '../../repositories/count-producer-crops-by-crop/count-producer-crops-by-crop.repository';

describe('CountProducerCropsByCropService', () => {
  let service: CountProducerCropsByCropService;

  const mockCountProducerCropsByCropRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountProducerCropsByCropService,
        {
          provide: CountProducerCropsByCropRepository,
          useValue: mockCountProducerCropsByCropRepository,
        },
      ],
    }).compile();

    service = module.get<CountProducerCropsByCropService>(CountProducerCropsByCropService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return the count of producer crops by crop', async () => {
      const result = [
        { crop: 'Soja', count: 2 },
        { crop: 'Café', count: 1 },
      ];
      mockCountProducerCropsByCropRepository.execute.mockResolvedValue(result);

      await expect(service.execute()).resolves.toEqual(result);
      expect(mockCountProducerCropsByCropRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});