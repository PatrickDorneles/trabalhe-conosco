import { Test, TestingModule } from '@nestjs/testing';
import { GetPropertyService } from './get-property.service';
import { SelectPropertyByIdRepository } from '../../repositories/select-property-by-id.repository';
import { PropertyNotFoundException } from '../../errors/property-not-found.exception';

describe('GetPropertyService', () => {
  let service: GetPropertyService;

  const mockSelectPropertyByIdRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPropertyService,
        { provide: SelectPropertyByIdRepository, useValue: mockSelectPropertyByIdRepository },
      ],
    }).compile();

    service = module.get<GetPropertyService>(GetPropertyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getById', () => {
    it('should return property when found', async () => {
      const property = { id: 'property-1', farmName: 'Fazenda Boa Vista' };
      mockSelectPropertyByIdRepository.execute.mockResolvedValue(property);

      const result = await service.getById('property-1');

      expect(result).toEqual(property);
      expect(mockSelectPropertyByIdRepository.execute).toHaveBeenCalledWith('property-1');
    });

    it('should throw PropertyNotFoundException when not found', async () => {
      mockSelectPropertyByIdRepository.execute.mockResolvedValue(null);

      await expect(service.getById('missing')).rejects.toThrow(PropertyNotFoundException);
    });
  });
});
