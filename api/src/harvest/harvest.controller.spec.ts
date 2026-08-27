import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { HarvestController } from './harvest.controller';
import { CreateHarvestService } from './services/create-harvest/create-harvest.service';
import { ListHarvestsService } from './services/list-harvests/list-harvests.service';
import { GetHarvestService } from './services/get-harvest/get-harvest.service';
import { UpdateHarvestService } from './services/update-harvest/update-harvest.service';
import { DeleteHarvestService } from './services/delete-harvest/delete-harvest.service';

describe('HarvestController', () => {
  let app: INestApplication;

  const mockCreateService = { execute: jest.fn() };
  const mockListService = { execute: jest.fn() };
  const mockGetService = { getById: jest.fn() };
  const mockUpdateService = { execute: jest.fn() };
  const mockDeleteService = { execute: jest.fn() };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [
        { provide: CreateHarvestService, useValue: mockCreateService },
        { provide: ListHarvestsService, useValue: mockListService },
        { provide: GetHarvestService, useValue: mockGetService },
        { provide: UpdateHarvestService, useValue: mockUpdateService },
        { provide: DeleteHarvestService, useValue: mockDeleteService },
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

  describe('POST /harvest', () => {
    it('should create a harvest', async () => {
      const dto = { year: 2024 };
      mockCreateService.execute.mockResolvedValue({ id: 'harvest-1', ...dto });

      const response = await request(app.getHttpServer())
        .post('/harvest')
        .send(dto)
        .expect(201);

      expect(response.body.id).toBe('harvest-1');
    });
  });

  describe('GET /harvest', () => {
    it('should list harvests', async () => {
      const output = { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
      mockListService.execute.mockResolvedValue(output);

      const response = await request(app.getHttpServer())
        .get('/harvest')
        .expect(200);

      expect(response.body).toEqual(output);
    });
  });

  describe('GET /harvest/:id', () => {
    it('should get a harvest by id', async () => {
      mockGetService.getById.mockResolvedValue({ id: 'harvest-1' });

      const response = await request(app.getHttpServer())
        .get('/harvest/123e4567-e89b-12d3-a456-426614174000')
        .expect(200);

      expect(response.body.id).toBe('harvest-1');
    });
  });

  describe('PATCH /harvest/:id', () => {
    it('should update a harvest', async () => {
      mockUpdateService.execute.mockResolvedValue({ id: 'harvest-1', year: 2025 });

      const response = await request(app.getHttpServer())
        .patch('/harvest/123e4567-e89b-12d3-a456-426614174000')
        .send({ year: 2025 })
        .expect(200);

      expect(response.body.year).toBe(2025);
    });
  });

  describe('DELETE /harvest/:id', () => {
    it('should delete a harvest', async () => {
      mockDeleteService.execute.mockResolvedValue(undefined);

      await request(app.getHttpServer())
        .delete('/harvest/123e4567-e89b-12d3-a456-426614174000')
        .expect(204);
    });
  });
});