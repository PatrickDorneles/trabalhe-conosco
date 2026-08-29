import { Test, TestingModule } from '@nestjs/testing';
import { CountPropertiesByStateService } from './count-properties-by-state.service';
import { CountPropertiesByStateRepository } from '../../repositories/count-properties-by-state.repository';

describe('CountPropertiesByStateService', () => {
  let service: CountPropertiesByStateService;

  const mockCountPropertiesByStateRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountPropertiesByStateService,
        {
          provide: CountPropertiesByStateRepository,
          useValue: mockCountPropertiesByStateRepository,
        },
      ],
    }).compile();

    service = module.get<CountPropertiesByStateService>(CountPropertiesByStateService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return the count of properties by state', async () => {
      const result = [
        { state: 'MG', count: 2 },
        { state: 'SP', count: 1 },
      ];
      mockCountPropertiesByStateRepository.execute.mockResolvedValue(result);

      await expect(service.execute()).resolves.toEqual(result);
      expect(mockCountPropertiesByStateRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});