import { Test, TestingModule } from '@nestjs/testing';
import { SearchCropsService } from './search-crops.service';
import { SearchCropsRepository } from '../../repositories/search-crops/search-crops.repository';

describe('SearchCropsService', () => {
  let service: SearchCropsService;

  const mockSearchCropsRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchCropsService,
        { provide: SearchCropsRepository, useValue: mockSearchCropsRepository },
      ],
    }).compile();

    service = module.get<SearchCropsService>(SearchCropsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should delegate to the repository', async () => {
    const term = 'soja';
    const pagination = { page: 1, limit: 20 };
    const mockResult = { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
    mockSearchCropsRepository.execute.mockResolvedValue(mockResult);

    const result = await service.execute(term, pagination);

    expect(result).toEqual(mockResult);
    expect(mockSearchCropsRepository.execute).toHaveBeenCalledWith(term, pagination);
  });
});