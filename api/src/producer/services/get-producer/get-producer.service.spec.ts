import { Test, TestingModule } from '@nestjs/testing';
import { GetProducerService } from './get-producer.service';
import { SelectProducerByIdRepository } from '../../repositories/select-producer-by-id/select-producer-by-id.repository';
import { SelectProducerByDocumentRepository } from '../../repositories/select-producer-by-document/select-producer-by-document.repository';
import { ProducerNotFoundException } from '../../errors/producer-not-found.exception';

describe('GetProducerService', () => {
  let service: GetProducerService;

  const mockSelectProducerByIdRepository = {
    execute: jest.fn(),
  };

  const mockSelectProducerByDocumentRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProducerService,
        { provide: SelectProducerByIdRepository, useValue: mockSelectProducerByIdRepository },
        { provide: SelectProducerByDocumentRepository, useValue: mockSelectProducerByDocumentRepository },
      ],
    }).compile();

    service = module.get<GetProducerService>(GetProducerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return a producer when found', async () => {
      const mockProducer = { id: '123', name: 'John', document: '12345678909' };
      mockSelectProducerByIdRepository.execute.mockResolvedValue(mockProducer);

      const result = await service.getById('123');

      expect(result).toEqual(mockProducer);
      expect(mockSelectProducerByIdRepository.execute).toHaveBeenCalledWith('123');
    });

    it('should throw ProducerNotFoundException when producer not found', async () => {
      mockSelectProducerByIdRepository.execute.mockResolvedValue(null);

      await expect(service.getById('999')).rejects.toThrow(ProducerNotFoundException);
    });
  });

  describe('getByDocument', () => {
    it('should return a producer when found', async () => {
      const mockProducer = { id: '123', name: 'John', document: '12345678909' };
      mockSelectProducerByDocumentRepository.execute.mockResolvedValue(mockProducer);

      const result = await service.getByDocument('12345678909');

      expect(result).toEqual(mockProducer);
      expect(mockSelectProducerByDocumentRepository.execute).toHaveBeenCalledWith('12345678909');
    });

    it('should throw ProducerNotFoundException when producer not found', async () => {
      mockSelectProducerByDocumentRepository.execute.mockResolvedValue(null);

      await expect(service.getByDocument('99999999999')).rejects.toThrow(ProducerNotFoundException);
    });
  });
});
