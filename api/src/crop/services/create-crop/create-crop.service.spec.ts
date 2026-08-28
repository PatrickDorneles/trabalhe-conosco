import { Test, TestingModule } from '@nestjs/testing';
import { CreateCropService } from './create-crop.service';
import { InsertCropRepository } from '../../repositories/insert-crop/insert-crop.repository';
import { SelectCropByNameRepository } from '../../repositories/select-crop-by-name/select-crop-by-name.repository';

describe('CreateCropService', () => {
  let service: CreateCropService;

  const mockSelectCropByNameRepository = {
    execute: jest.fn(),
  };

  const mockInsertCropRepository = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCropService,
        {
          provide: SelectCropByNameRepository,
          useValue: mockSelectCropByNameRepository,
        },
        { provide: InsertCropRepository, useValue: mockInsertCropRepository },
      ],
    }).compile();

    service = module.get<CreateCropService>(CreateCropService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return the existing crop when an exact match exists', async () => {
      const dto = { name: 'Soja' };
      const mockExistingCrop = { id: '123', name: 'Soja' };
      mockSelectCropByNameRepository.execute.mockResolvedValue(mockExistingCrop);

      const result = await service.execute(dto);

      expect(result).toEqual(mockExistingCrop);
      expect(mockSelectCropByNameRepository.execute).toHaveBeenCalledWith('Soja');
      expect(mockInsertCropRepository.execute).not.toHaveBeenCalled();
    });

    it('should create the crop when no match exists', async () => {
      const dto = { name: 'Milho' };
      const mockNewCrop = { id: '456', name: 'Milho' };
      mockSelectCropByNameRepository.execute.mockResolvedValue(null);
      mockInsertCropRepository.execute.mockResolvedValue(mockNewCrop);

      const result = await service.execute(dto);

      expect(result).toEqual(mockNewCrop);
      expect(mockSelectCropByNameRepository.execute).toHaveBeenCalledWith('Milho');
      expect(mockInsertCropRepository.execute).toHaveBeenCalledWith({ name: 'Milho' });
    });

    it('should trim the name before checking and creating', async () => {
      const dto = { name: '  Soja  ' };
      mockSelectCropByNameRepository.execute.mockResolvedValue(null);
      mockInsertCropRepository.execute.mockResolvedValue({ id: '789', name: 'Soja' });

      await service.execute(dto);

      expect(mockSelectCropByNameRepository.execute).toHaveBeenCalledWith('Soja');
      expect(mockInsertCropRepository.execute).toHaveBeenCalledWith({ name: 'Soja' });
    });
  });
});