import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CropController } from './crop.controller';
import { CreateCropService } from './services/create-crop/create-crop.service';
import { SearchCropsService } from './services/search-crops/search-crops.service';

describe('CropController', () => {
  let app: INestApplication;

  const mockCreateService = { execute: jest.fn() };
  const mockSearchService = { execute: jest.fn() };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropController],
      providers: [
        { provide: CreateCropService, useValue: mockCreateService },
        { provide: SearchCropsService, useValue: mockSearchService },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /crop', () => {
    it('should create a crop', async () => {
      const dto = { name: 'Soja' };
      mockCreateService.execute.mockResolvedValue({ id: 'crop-1', ...dto });

      const response = await request(app.getHttpServer())
        .post('/crop')
        .send(dto)
        .expect(201);

      expect(response.body.id).toBe('crop-1');
      expect(mockCreateService.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('GET /crop', () => {
    it('should search crops with term', async () => {
      const output = { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
      mockSearchService.execute.mockResolvedValue(output);

      const response = await request(app.getHttpServer())
        .get('/crop?term=soja')
        .expect(200);

      expect(response.body).toEqual(output);
      expect(mockSearchService.execute).toHaveBeenCalledWith('soja', expect.anything());
    });

    it('should search crops without term', async () => {
      const output = { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
      mockSearchService.execute.mockResolvedValue(output);

      await request(app.getHttpServer())
        .get('/crop')
        .expect(200);

      expect(mockSearchService.execute).toHaveBeenCalledWith('', expect.anything());
    });
  });
});