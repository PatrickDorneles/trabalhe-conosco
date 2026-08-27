import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProducerService } from './delete-producer.service';
import { GetProducerService } from '../get-producer/get-producer.service';
import { DeleteProducerRepository } from '../../repositories/delete-producer/delete-producer.repository';
import { ProducerNotFoundException } from '../../errors/producer-not-found.exception';

describe('DeleteProducerService', () => {
  let service: DeleteProducerService;

  const mockGetProducerService = {
    getById: jest.fn(),
  };

  const mockDeleteProducerRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProducerService,
        { provide: GetProducerService, useValue: mockGetProducerService },
        { provide: DeleteProducerRepository, useValue: mockDeleteProducerRepository },
      ],
    }).compile();

    service = module.get<DeleteProducerService>(DeleteProducerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should delete producer when found', async () => {
      mockGetProducerService.getById.mockResolvedValue({ id: '123', name: 'John' });
      mockDeleteProducerRepository.execute.mockResolvedValue(undefined);

      await service.execute('123');

      expect(mockGetProducerService.getById).toHaveBeenCalledWith('123');
      expect(mockDeleteProducerRepository.execute).toHaveBeenCalledWith('123');
    });

    it('should throw ProducerNotFoundException when producer does not exist', async () => {
      mockGetProducerService.getById.mockRejectedValue(new ProducerNotFoundException());

      await expect(service.execute('999')).rejects.toThrow(ProducerNotFoundException);
      expect(mockDeleteProducerRepository.execute).not.toHaveBeenCalled();
    });
  });
});
