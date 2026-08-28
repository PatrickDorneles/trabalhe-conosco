import { Test, TestingModule } from '@nestjs/testing';
import { GetProducerCropService } from './get-producer-crop.service';
import { SelectProducerCropByIdRepository } from '../../repositories/select-producer-crop-by-id/select-producer-crop-by-id.repository';
import { ProducerCropNotFoundException } from '../../errors/producer-crop-not-found.exception';

describe('GetProducerCropService', () => {
  let service: GetProducerCropService;

  const mockSelectProducerCropByIdRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProducerCropService,
        {
          provide: SelectProducerCropByIdRepository,
          useValue: mockSelectProducerCropByIdRepository,
        },
      ],
    }).compile();

    service = module.get<GetProducerCropService>(GetProducerCropService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return producerCrop when found', async () => {
      const producerCrop = { id: 'producer-crop-1' };
      mockSelectProducerCropByIdRepository.execute.mockResolvedValue(producerCrop);

      const result = await service.getById('producer-crop-1');

      expect(result).toEqual(producerCrop);
      expect(mockSelectProducerCropByIdRepository.execute).toHaveBeenCalledWith('producer-crop-1');
    });

    it('should throw ProducerCropNotFoundException when not found', async () => {
      mockSelectProducerCropByIdRepository.execute.mockResolvedValue(null);

      await expect(service.getById('missing')).rejects.toThrow(ProducerCropNotFoundException);
    });
  });
});