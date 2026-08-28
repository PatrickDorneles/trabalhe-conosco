import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, NotFoundException } from '@nestjs/common';
import request from 'supertest';
import { ProducerCropController } from './producer-crop.controller';
import { CreateProducerCropService } from './services/create-producer-crop/create-producer-crop.service';
import { GetProducerCropService } from './services/get-producer-crop/get-producer-crop.service';
import { ListProducerCropService } from './services/list-producer-crop/list-producer-crop.service';
import { UpdateProducerCropService } from './services/update-producer-crop/update-producer-crop.service';
import { DeleteProducerCropService } from './services/delete-producer-crop/delete-producer-crop.service';

describe('ProducerCropController', () => {
  let app: INestApplication;

  const mockCreateService = { execute: jest.fn() };
  const mockGetService = { getById: jest.fn() };
  const mockListService = { execute: jest.fn() };
  const mockUpdateService = { execute: jest.fn() };
  const mockDeleteService = { execute: jest.fn() };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerCropController],
      providers: [
        { provide: CreateProducerCropService, useValue: mockCreateService },
        { provide: GetProducerCropService, useValue: mockGetService },
        { provide: ListProducerCropService, useValue: mockListService },
        { provide: UpdateProducerCropService, useValue: mockUpdateService },
        { provide: DeleteProducerCropService, useValue: mockDeleteService },
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

  describe('POST /producer-crop', () => {
    it('should create a producer-crop', async () => {
      const dto = {
        ruralPropertyId: 'property-1',
        harvestId: 'harvest-1',
        cropName: 'Soja',
      };
      mockCreateService.execute.mockResolvedValue({ id: 'producer-crop-1', ...dto });

      const response = await request(app.getHttpServer())
        .post('/producer-crop')
        .send(dto)
        .expect(201);

      expect(response.body.id).toBe('producer-crop-1');
      expect(mockCreateService.execute).toHaveBeenCalledWith(dto);
    });
  });

  describe('GET /producer-crop', () => {
    it('should list producer-crops', async () => {
      const output = { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
      mockListService.execute.mockResolvedValue(output);

      await request(app.getHttpServer())
        .get('/producer-crop')
        .expect(200);

      expect(mockListService.execute).toHaveBeenCalledWith(expect.anything());
    });

    it('should pass filter query params', async () => {
      const output = { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
      mockListService.execute.mockResolvedValue(output);

      await request(app.getHttpServer())
        .get('/producer-crop?harvestId=harvest-1&ruralPropertyId=property-1&producerId=producer-1')
        .expect(200);

      expect(mockListService.execute).toHaveBeenCalledWith(
        expect.objectContaining({
          harvestId: 'harvest-1',
          ruralPropertyId: 'property-1',
          producerId: 'producer-1',
        }),
      );
    });
  });

  describe('GET /producer-crop/:id', () => {
    it('should return a producer-crop', async () => {
      mockGetService.getById.mockResolvedValue({ id: 'producer-crop-1' });

      const response = await request(app.getHttpServer())
        .get('/producer-crop/85a60ad8-5e5b-4f36-83cb-a995ac250795')
        .expect(200);

      expect(response.body.id).toBe('producer-crop-1');
      expect(mockGetService.getById).toHaveBeenCalledWith('85a60ad8-5e5b-4f36-83cb-a995ac250795');
    });

    it('should return 404 when not found', async () => {
      mockGetService.getById.mockRejectedValue(new NotFoundException());

      await request(app.getHttpServer())
        .get('/producer-crop/85a60ad8-5e5b-4f36-83cb-a995ac250795')
        .expect(404);
    });
  });

  describe('PATCH /producer-crop/:id', () => {
    it('should update a producer-crop', async () => {
      const dto = { cropName: 'Café' };
      const id = '85a60ad8-5e5b-4f36-83cb-a995ac250795';
      mockUpdateService.execute.mockResolvedValue({ id, crop: { name: 'Café' } });

      const response = await request(app.getHttpServer())
        .patch(`/producer-crop/${id}`)
        .send(dto)
        .expect(200);

      expect(response.body.id).toBe(id);
      expect(mockUpdateService.execute).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('DELETE /producer-crop/:id', () => {
    it('should delete a producer-crop', async () => {
      mockDeleteService.execute.mockResolvedValue(undefined);

      await request(app.getHttpServer())
        .delete('/producer-crop/85a60ad8-5e5b-4f36-83cb-a995ac250795')
        .expect(204);

      expect(mockDeleteService.execute).toHaveBeenCalledWith('85a60ad8-5e5b-4f36-83cb-a995ac250795');
    });
  });
});