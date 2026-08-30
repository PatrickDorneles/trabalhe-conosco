import { Test, TestingModule } from '@nestjs/testing';
import { SumTotalAreaService } from './sum-total-area.service';
import { SumTotalAreaRepository } from '../../repositories/sum-total-area.repository';

describe('SumTotalAreaService', () => {
  let service: SumTotalAreaService;

  const mockSumTotalAreaRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SumTotalAreaService,
        {
          provide: SumTotalAreaRepository,
          useValue: mockSumTotalAreaRepository,
        },
      ],
    }).compile();

    service = module.get<SumTotalAreaService>(SumTotalAreaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return the sum of total area of properties', async () => {
      mockSumTotalAreaRepository.execute.mockResolvedValue(2500);

      await expect(service.execute()).resolves.toBe(2500);
      expect(mockSumTotalAreaRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});