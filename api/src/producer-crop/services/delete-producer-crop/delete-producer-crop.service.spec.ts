import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProducerCropService } from './delete-producer-crop.service';
import { GetProducerCropService } from '../get-producer-crop/get-producer-crop.service';
import { DeleteProducerCropRepository } from '../../repositories/delete-producer-crop/delete-producer-crop.repository';
import { ProducerCropNotFoundException } from '../../errors/producer-crop-not-found.exception';

describe('DeleteProducerCropService', () => {
  let service: DeleteProducerCropService;

  const mockGetProducerCropService = {
    getById: jest.fn(),
  };

  const mockDeleteProducerCropRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProducerCropService,
        { provide: GetProducerCropService, useValue: mockGetProducerCropService },
        {
          provide: DeleteProducerCropRepository,
          useValue: mockDeleteProducerCropRepository,
        },
      ],
    }).compile();

    service = module.get<DeleteProducerCropService>(DeleteProducerCropService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should delete producerCrop when found', async () => {
      mockGetProducerCropService.getById.mockResolvedValue({ id: 'producer-crop-1' });
      mockDeleteProducerCropRepository.execute.mockResolvedValue(undefined);

      await service.execute('producer-crop-1');

      expect(mockGetProducerCropService.getById).toHaveBeenCalledWith('producer-crop-1');
      expect(mockDeleteProducerCropRepository.execute).toHaveBeenCalledWith('producer-crop-1');
    });

    it('should throw ProducerCropNotFoundException when not found', async () => {
      mockGetProducerCropService.getById.mockRejectedValue(new ProducerCropNotFoundException());

      await expect(service.execute('missing')).rejects.toThrow(ProducerCropNotFoundException);
      expect(mockDeleteProducerCropRepository.execute).not.toHaveBeenCalled();
    });
  });
});