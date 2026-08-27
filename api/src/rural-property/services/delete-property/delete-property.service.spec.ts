import { Test, TestingModule } from '@nestjs/testing';
import { DeletePropertyService } from './delete-property.service';
import { GetPropertyService } from '../get-property/get-property.service';
import { DeletePropertyRepository } from '../../repositories/delete-property.repository';
import { PropertyNotFoundException } from '../../errors/property-not-found.exception';

describe('DeletePropertyService', () => {
  let service: DeletePropertyService;

  const mockGetPropertyService = {
    getById: jest.fn(),
  };

  const mockDeletePropertyRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeletePropertyService,
        { provide: GetPropertyService, useValue: mockGetPropertyService },
        { provide: DeletePropertyRepository, useValue: mockDeletePropertyRepository },
      ],
    }).compile();

    service = module.get<DeletePropertyService>(DeletePropertyService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should delete property when found', async () => {
      mockGetPropertyService.getById.mockResolvedValue({ id: 'property-1' });
      mockDeletePropertyRepository.execute.mockResolvedValue(undefined);

      await service.execute('property-1');

      expect(mockGetPropertyService.getById).toHaveBeenCalledWith('property-1');
      expect(mockDeletePropertyRepository.execute).toHaveBeenCalledWith('property-1');
    });

    it('should throw PropertyNotFoundException when property does not exist', async () => {
      mockGetPropertyService.getById.mockRejectedValue(new PropertyNotFoundException());

      await expect(service.execute('missing')).rejects.toThrow(PropertyNotFoundException);
      expect(mockDeletePropertyRepository.execute).not.toHaveBeenCalled();
    });
  });
});
