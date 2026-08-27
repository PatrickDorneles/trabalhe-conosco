import { Test, TestingModule } from '@nestjs/testing';
import { ListProducersService } from './list-producers.service';
import { SelectAllProducersRepository } from '../../repositories/select-all-producers/select-all-producers.repository';

describe('ListProducersService', () => {
  let service: ListProducersService;

  const mockSelectAllProducersRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListProducersService,
        { provide: SelectAllProducersRepository, useValue: mockSelectAllProducersRepository },
      ],
    }).compile();

    service = module.get<ListProducersService>(ListProducersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return paginated producers', async () => {
      const pagination = { page: 1, limit: 10 };
      const mockOutput = {
        data: [{ id: '1', name: 'John', document: '12345678909' }],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      };
      mockSelectAllProducersRepository.execute.mockResolvedValue(mockOutput);

      const result = await service.execute(pagination);

      expect(result).toEqual(mockOutput);
      expect(mockSelectAllProducersRepository.execute).toHaveBeenCalledWith(pagination);
    });
  });
});
