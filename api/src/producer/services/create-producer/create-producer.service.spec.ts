import { Test, TestingModule } from '@nestjs/testing';
import { CreateProducerService } from './create-producer.service';
import { InsertProducerRepository } from '../../repositories/insert-producer/insert-producer.repository';
import { GetProducerService } from '../get-producer/get-producer.service';
import { ProducerDocumentAlreadyInUseException } from '../../errors/producer-document-already-in-use.exception';

describe('CreateProducerService', () => {
  let service: CreateProducerService;

  const mockInsertProducerRepository = {
    execute: jest.fn(),
  };

  const mockGetProducerService = {
    getByDocument: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProducerService,
        { provide: InsertProducerRepository, useValue: mockInsertProducerRepository },
        { provide: GetProducerService, useValue: mockGetProducerService },
      ],
    }).compile();

    service = module.get<CreateProducerService>(CreateProducerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should create producer when document is available', async () => {
      const dto = { name: 'João da Silva', document: '12345678909' };
      const mockProducer = { id: '123', name: 'João da Silva', document: '12345678909' };
      mockGetProducerService.getByDocument.mockRejectedValue(new Error());
      mockInsertProducerRepository.execute.mockResolvedValue(mockProducer);

      const result = await service.execute(dto);

      expect(result).toEqual(mockProducer);
      expect(mockGetProducerService.getByDocument).toHaveBeenCalledWith('12345678909');
      expect(mockInsertProducerRepository.execute).toHaveBeenCalledWith({
        name: 'João da Silva',
        document: '12345678909',
      });
    });

    it('should strip non-digit characters from document', async () => {
      const dto = { name: 'João da Silva', document: '529.982.247-25' };
      const mockProducer = { id: '123', name: 'João da Silva', document: '52998224725' };
      mockGetProducerService.getByDocument.mockRejectedValue(new Error());
      mockInsertProducerRepository.execute.mockResolvedValue(mockProducer);

      await service.execute(dto);

      expect(mockGetProducerService.getByDocument).toHaveBeenCalledWith('52998224725');
      expect(mockInsertProducerRepository.execute).toHaveBeenCalledWith({
        name: 'João da Silva',
        document: '52998224725',
      });
    });

    it('should strip formatting from CNPJ', async () => {
      const dto = { name: 'Empresa', document: '11.222.333/0001-81' };
      const mockProducer = { id: '456', name: 'Empresa', document: '11222333000181' };
      mockGetProducerService.getByDocument.mockRejectedValue(new Error());
      mockInsertProducerRepository.execute.mockResolvedValue(mockProducer);

      await service.execute(dto);

      expect(mockGetProducerService.getByDocument).toHaveBeenCalledWith('11222333000181');
      expect(mockInsertProducerRepository.execute).toHaveBeenCalledWith({
        name: 'Empresa',
        document: '11222333000181',
      });
    });

    it('should throw ProducerDocumentAlreadyInUseException when document already exists', async () => {
      const dto = { name: 'João da Silva', document: '529.982.247-25' };
      const existingProducer = { id: '999', name: 'Jane', document: '52998224725' };
      mockGetProducerService.getByDocument.mockResolvedValue(existingProducer);

      await expect(service.execute(dto)).rejects.toThrow(ProducerDocumentAlreadyInUseException);
      expect(mockInsertProducerRepository.execute).not.toHaveBeenCalled();
    });
  });
});
