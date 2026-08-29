import { Test, TestingModule } from '@nestjs/testing';
import { CountPropertiesService } from './count-properties.service';
import { CountPropertiesRepository } from '../../repositories/count-properties.repository';

describe('CountPropertiesService', () => {
  let service: CountPropertiesService;

  const mockCountPropertiesRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountPropertiesService,
        {
          provide: CountPropertiesRepository,
          useValue: mockCountPropertiesRepository,
        },
      ],
    }).compile();

    service = module.get<CountPropertiesService>(CountPropertiesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return the total count of properties', async () => {
      mockCountPropertiesRepository.execute.mockResolvedValue(5);

      await expect(service.execute()).resolves.toBe(5);
      expect(mockCountPropertiesRepository.execute).toHaveBeenCalledTimes(1);
    });
  });
});