import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePropertyService } from './update-property.service';
import { GetPropertyService } from '../get-property/get-property.service';
import { UpdatePropertyRepository } from '../../repositories/update-property.repository';
import { PropertyNotFoundException } from '../../errors/property-not-found.exception';
import { PropertyInvalidAreaException } from '../../errors/property-invalid-area.exception';
import { PropertyAreaValidator } from '../../validators/property-area.validator';

describe('UpdatePropertyService', () => {
  let service: UpdatePropertyService;

  const mockGetPropertyService = {
    getById: jest.fn(),
  };

  const mockUpdatePropertyRepository = {
    execute: jest.fn(),
  };

  const mockPropertyAreaValidator = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePropertyService,
        { provide: GetPropertyService, useValue: mockGetPropertyService },
        { provide: UpdatePropertyRepository, useValue: mockUpdatePropertyRepository },
        { provide: PropertyAreaValidator, useValue: mockPropertyAreaValidator },
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
    const existingProperty = {
      id,
      farmName: 'Fazenda Boa Vista',
      totalArea: 1000,
      arableArea: 700,
      vegetationArea: 200,
    };
    const dto = { farmName: 'Fazenda Boa Vista Atualizada', totalArea: 1300.5 };

    it('should update property when found', async () => {
      const updated = { id, farmName: 'Fazenda Boa Vista Atualizada', totalArea: 1300.5 };
      mockGetPropertyService.getById.mockResolvedValue(existingProperty);
      mockUpdatePropertyRepository.execute.mockResolvedValue(updated);

      const result = await service.execute(id, dto);

      expect(result).toEqual(updated);
      expect(mockGetPropertyService.getById).toHaveBeenCalledWith(id);
      expect(mockPropertyAreaValidator.execute).toHaveBeenCalledWith({
        totalArea: 1300.5,
        arableArea: 700,
        vegetationArea: 200,
      });
      expect(mockUpdatePropertyRepository.execute).toHaveBeenCalledWith(id, dto);
    });

    it('should validate against existing areas when not provided in dto', async () => {
      const partialDto = { arableArea: 900 };
      mockGetPropertyService.getById.mockResolvedValue(existingProperty);
      mockUpdatePropertyRepository.execute.mockResolvedValue({ id });

      await service.execute(id, partialDto);

      expect(mockPropertyAreaValidator.execute).toHaveBeenCalledWith({
        totalArea: 1000,
        arableArea: 900,
        vegetationArea: 200,
      });
    });

    it('should throw PropertyNotFoundException when property does not exist', async () => {
      mockGetPropertyService.getById.mockRejectedValue(new PropertyNotFoundException());

      await expect(service.execute(id, dto)).rejects.toThrow(PropertyNotFoundException);
      expect(mockPropertyAreaValidator.execute).not.toHaveBeenCalled();
      expect(mockUpdatePropertyRepository.execute).not.toHaveBeenCalled();
    });

    it('should throw PropertyInvalidAreaException when merged areas exceed total area', async () => {
      mockGetPropertyService.getById.mockResolvedValue(existingProperty);
      mockPropertyAreaValidator.execute.mockImplementation(() => {
        throw new PropertyInvalidAreaException();
      });

      await expect(service.execute(id, dto)).rejects.toThrow(PropertyInvalidAreaException);
      expect(mockUpdatePropertyRepository.execute).not.toHaveBeenCalled();
    });
  });
});
