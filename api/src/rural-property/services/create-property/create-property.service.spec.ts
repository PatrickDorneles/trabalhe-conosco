import { Test, TestingModule } from '@nestjs/testing';
import { CreatePropertyService } from './create-property.service';
import { InsertPropertyRepository } from '../../repositories/insert-property.repository';
import { GetProducerService } from '../../../producer/services/get-producer/get-producer.service';
import { ProducerNotFoundException } from '../../../producer/errors/producer-not-found.exception';

describe('CreatePropertyService', () => {
  let service: CreatePropertyService;

  const mockInsertPropertyRepository = {
    execute: jest.fn(),
  };

  const mockGetProducerService = {
    getById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreatePropertyService,
        { provide: InsertPropertyRepository, useValue: mockInsertPropertyRepository },
        { provide: GetProducerService, useValue: mockGetProducerService },
      ],
    }).compile();

    service = module.get<CreatePropertyService>(CreatePropertyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const dto = {
      farmName: 'Fazenda Boa Vista',
      city: 'Uberlândia',
      state: 'MG',
      totalArea: 1200.5,
      arableArea: 800.25,
      vegetationArea: 200.5,
      producerId: 'b5cdc875-89d4-4ae6-a2ce-7baf223ee81b',
    };

    it('should create property when producer exists', async () => {
      const producer = { id: dto.producerId, name: 'João', document: '12345678909' };
      const property = { id: 'property-1', ...dto };
      mockGetProducerService.getById.mockResolvedValue(producer);
      mockInsertPropertyRepository.execute.mockResolvedValue(property);

      const result = await service.execute(dto);

      expect(result).toEqual(property);
      expect(mockGetProducerService.getById).toHaveBeenCalledWith(dto.producerId);
      expect(mockInsertPropertyRepository.execute).toHaveBeenCalledWith({
        farmName: dto.farmName,
        city: dto.city,
        state: dto.state,
        totalArea: dto.totalArea,
        arableArea: dto.arableArea,
        vegetationArea: dto.vegetationArea,
        producer,
      });
    });

    it('should throw when producer does not exist', async () => {
      mockGetProducerService.getById.mockRejectedValue(new ProducerNotFoundException());

      await expect(service.execute(dto)).rejects.toThrow(ProducerNotFoundException);
      expect(mockInsertPropertyRepository.execute).not.toHaveBeenCalled();
    });
  });
});
