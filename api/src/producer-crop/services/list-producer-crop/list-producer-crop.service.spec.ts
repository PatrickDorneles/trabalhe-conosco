import { Test, TestingModule } from '@nestjs/testing';
import { ListProducerCropService } from './list-producer-crop.service';
import { SelectAllProducerCropsRepository } from '../../repositories/select-all-producer-crops/select-all-producer-crops.repository';

describe('ListProducerCropService', () => {
  let service: ListProducerCropService;

  const mockSelectAllProducerCropsRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListProducerCropService,
        {
          provide: SelectAllProducerCropsRepository,
          useValue: mockSelectAllProducerCropsRepository,
        },
      ],
    }).compile();

    service = module.get<ListProducerCropService>(ListProducerCropService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delegate to the repository with filters', async () => {
    const dto = {
      page: 1,
      limit: 20,
      harvestId: 'harvest-1',
      ruralPropertyId: 'property-1',
      producerId: 'producer-1',
    };
    const mockResult = { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
    mockSelectAllProducerCropsRepository.execute.mockResolvedValue(mockResult);

    const result = await service.execute(dto);

    expect(result).toEqual(mockResult);
    expect(mockSelectAllProducerCropsRepository.execute).toHaveBeenCalledWith(
      {
        harvestId: 'harvest-1',
        ruralPropertyId: 'property-1',
        producerId: 'producer-1',
      },
      dto,
    );
  });

  it('should pass empty filters when omitted', async () => {
    const dto = { page: 1, limit: 20 };
    mockSelectAllProducerCropsRepository.execute.mockResolvedValue({ data: [], total: 0, page: 1, limit: 20, totalPages: 0 });

    await service.execute(dto);

    expect(mockSelectAllProducerCropsRepository.execute).toHaveBeenCalledWith(
      { harvestId: undefined, ruralPropertyId: undefined, producerId: undefined },
      dto,
    );
  });
});