import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { RuralPropertyController } from './rural-property.controller';
import { CreatePropertyService } from './services/create-property/create-property.service';
import { ListPropertiesService } from './services/list-properties/list-properties.service';
import { GetPropertyService } from './services/get-property/get-property.service';
import { UpdatePropertyService } from './services/update-property/update-property.service';
import { DeletePropertyService } from './services/delete-property/delete-property.service';

describe('RuralPropertyController', () => {
  let app: INestApplication;

  const mockCreateService = { execute: jest.fn() };
  const mockListService = { execute: jest.fn() };
  const mockGetService = { getById: jest.fn() };
  const mockUpdateService = { execute: jest.fn() };
  const mockDeleteService = { execute: jest.fn() };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuralPropertyController],
      providers: [
        { provide: CreatePropertyService, useValue: mockCreateService },
        { provide: ListPropertiesService, useValue: mockListService },
        { provide: GetPropertyService, useValue: mockGetService },
        { provide: UpdatePropertyService, useValue: mockUpdateService },
        { provide: DeletePropertyService, useValue: mockDeleteService },
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

  describe('POST /rural-property', () => {
    it('should create a property', async () => {
      const dto = {
        farmName: 'Fazenda Boa Vista',
        city: 'Uberlândia',
        state: 'MG',
        totalArea: 1200.5,
        arableArea: 800.25,
        vegetationArea: 200.5,
        producerId: 'b5cdc875-89d4-4ae6-a2ce-7baf223ee81b',
      };
      mockCreateService.execute.mockResolvedValue({ id: 'property-1', ...dto });

      const response = await request(app.getHttpServer())
        .post('/rural-property')
        .send(dto)
        .expect(201);

      expect(response.body.id).toBe('property-1');
    });
  });

  describe('GET /rural-property', () => {
    it('should list properties', async () => {
      const output = { data: [], total: 0, page: 1, limit: 20, totalPages: 0 };
      mockListService.execute.mockResolvedValue(output);

      const response = await request(app.getHttpServer())
        .get('/rural-property')
        .expect(200);

      expect(response.body).toEqual(output);
    });
  });

  describe('GET /rural-property/:id', () => {
    it('should get a property by id', async () => {
      mockGetService.getById.mockResolvedValue({ id: 'property-1' });

      const response = await request(app.getHttpServer())
        .get('/rural-property/123e4567-e89b-12d3-a456-426614174000')
        .expect(200);

      expect(response.body.id).toBe('property-1');
    });
  });

  describe('PATCH /rural-property/:id', () => {
    it('should update a property', async () => {
      mockUpdateService.execute.mockResolvedValue({ id: 'property-1', farmName: 'Nova' });

      const response = await request(app.getHttpServer())
        .patch('/rural-property/123e4567-e89b-12d3-a456-426614174000')
        .send({ farmName: 'Nova' })
        .expect(200);

      expect(response.body.farmName).toBe('Nova');
    });
  });

  describe('DELETE /rural-property/:id', () => {
    it('should delete a property', async () => {
      mockDeleteService.execute.mockResolvedValue(undefined);

      await request(app.getHttpServer())
        .delete('/rural-property/123e4567-e89b-12d3-a456-426614174000')
        .expect(204);
    });
  });
});
