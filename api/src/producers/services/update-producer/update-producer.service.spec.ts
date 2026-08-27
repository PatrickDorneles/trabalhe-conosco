import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProducerService } from './update-producer.service';
import { GetProducerService } from '../get-producer/get-producer.service';
import { UpdateProducerRepository } from '../../repositories/update-producer/update-producer.repository';
import { ProducerNotFoundException } from '../../errors/producer-not-found.exception';

describe('UpdateProducerService', () => {
  let service: UpdateProducerService;

  const mockGetProducerService = {
    getById: jest.fn(),
  };

  const mockUpdateProducerRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProducerService,
        { provide: GetProducerService, useValue: mockGetProducerService },
        { provide: UpdateProducerRepository, useValue: mockUpdateProducerRepository },
      ],
    }).compile();

    service = module.get<UpdateProducerService>(UpdateProducerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should update producer name', async () => {
      const existing = { id: '123', name: 'John', document: '12345678909' };
      const updated = { ...existing, name: 'Jane' };
      mockGetProducerService.getById.mockResolvedValue(existing);
      mockUpdateProducerRepository.execute.mockResolvedValue(updated);

      const result = await service.execute('123', { name: 'Jane' });

      expect(result).toEqual(updated);
      expect(mockUpdateProducerRepository.execute).toHaveBeenCalledWith('123', { name: 'Jane' });
    });

    it('should throw ProducerNotFoundException when producer does not exist', async () => {
      mockGetProducerService.getById.mockRejectedValue(new ProducerNotFoundException());

      await expect(service.execute('999', { name: 'Jane' })).rejects.toThrow(ProducerNotFoundException);
      expect(mockUpdateProducerRepository.execute).not.toHaveBeenCalled();
    });
  });
});
