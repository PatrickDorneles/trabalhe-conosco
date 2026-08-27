import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePropertyService } from './update-property.service';
import { GetPropertyService } from '../get-property/get-property.service';
import { UpdatePropertyRepository } from '../../repositories/update-property.repository';
import { PropertyNotFoundException } from '../../errors/property-not-found.exception';

describe('UpdatePropertyService', () => {
  let service: UpdatePropertyService;

  const mockGetPropertyService = {
    getById: jest.fn(),
  };

  const mockUpdatePropertyRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePropertyService,
        { provide: GetPropertyService, useValue: mockGetPropertyService },
        { provide: UpdatePropertyRepository, useValue: mockUpdatePropertyRepository },
      ],
    }).compile();

    service = module.get<UpdatePropertyService>(UpdatePropertyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const id = 'property-1';
    const dto = { farmName: 'Fazenda Boa Vista', totalArea: 1300.5 };

    it('should update property when found', async () => {
      const updated = { id, farmName: 'Fazenda Boa Vista', totalArea: 1300.5 };
      mockGetPropertyService.getById.mockResolvedValue({ id });
      mockUpdatePropertyRepository.execute.mockResolvedValue(updated);

      const result = await service.execute(id, dto);

      expect(result).toEqual(updated);
      expect(mockGetPropertyService.getById).toHaveBeenCalledWith(id);
      expect(mockUpdatePropertyRepository.execute).toHaveBeenCalledWith(id, dto);
    });

    it('should throw PropertyNotFoundException when property does not exist', async () => {
      mockGetPropertyService.getById.mockRejectedValue(new PropertyNotFoundException());

      await expect(service.execute(id, dto)).rejects.toThrow(PropertyNotFoundException);
      expect(mockUpdatePropertyRepository.execute).not.toHaveBeenCalled();
    });
  });
});
