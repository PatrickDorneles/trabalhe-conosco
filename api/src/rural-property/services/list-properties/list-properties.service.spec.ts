import { Test, TestingModule } from '@nestjs/testing';
import { ListPropertiesService } from './list-properties.service';
import { SelectAllPropertiesRepository } from '../../repositories/select-all-properties.repository';

describe('ListPropertiesService', () => {
  let service: ListPropertiesService;

  const mockSelectAllPropertiesRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListPropertiesService,
        { provide: SelectAllPropertiesRepository, useValue: mockSelectAllPropertiesRepository },
      ],
    }).compile();

    service = module.get<ListPropertiesService>(ListPropertiesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const pagination = { page: 1, limit: 20 };

    it('should list properties without filters', async () => {
      const output = { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
      mockSelectAllPropertiesRepository.execute.mockResolvedValue(output);

      const result = await service.execute(pagination);

      expect(result).toEqual(output);
      expect(mockSelectAllPropertiesRepository.execute).toHaveBeenCalledWith(pagination, undefined);
    });

    it('should list properties with producer filter', async () => {
      const output = { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
      const filters = { producerId: 'producer-1' };
      mockSelectAllPropertiesRepository.execute.mockResolvedValue(output);

      const result = await service.execute(pagination, filters);

      expect(result).toEqual(output);
      expect(mockSelectAllPropertiesRepository.execute).toHaveBeenCalledWith(pagination, filters);
    });
  });
});
