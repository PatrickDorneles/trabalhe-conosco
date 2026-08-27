import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ProducersController } from './producers.controller';
import { CreateProducerService } from './services/create-producer/create-producer.service';
import { ListProducersService } from './services/list-producers/list-producers.service';
import { GetProducerService } from './services/get-producer/get-producer.service';
import { UpdateProducerService } from './services/update-producer/update-producer.service';
import { DeleteProducerService } from './services/delete-producer/delete-producer.service';

describe('ProducersController', () => {
  let app: INestApplication;

  const mockCreateService = { execute: jest.fn() };
  const mockListService = { execute: jest.fn() };
  const mockGetService = { getById: jest.fn() };
  const mockUpdateService = { execute: jest.fn() };
  const mockDeleteService = { execute: jest.fn() };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        { provide: CreateProducerService, useValue: mockCreateService },
        { provide: ListProducersService, useValue: mockListService },
        { provide: GetProducerService, useValue: mockGetService },
        { provide: UpdateProducerService, useValue: mockUpdateService },
        { provide: DeleteProducerService, useValue: mockDeleteService },
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

  describe('POST /producers', () => {
    it('should create a producer', async () => {
      const dto = { name: 'John', document: '12345678909' };
      const output = { name: 'John', document: '12345678909' };
      mockCreateService.execute.mockResolvedValue(output);

      const response = await request(app.getHttpServer())
        .post('/producers')
        .send(dto)
        .expect(201);

      expect(response.body).toEqual(output);
    });
  });

  describe('GET /producers', () => {
    it('should list producers', async () => {
      const output = { data: [], meta: { total: 0, page: 1, limit: 20 } };
      mockListService.execute.mockResolvedValue(output);

      const response = await request(app.getHttpServer())
        .get('/producers')
        .expect(200);

      expect(response.body).toEqual(output);
    });
  });

  describe('GET /producers/:id', () => {
    it('should get a producer by id', async () => {
      const output = { name: 'John', document: '12345678909' };
      mockGetService.getById.mockResolvedValue(output);

      const response = await request(app.getHttpServer())
        .get('/producers/123e4567-e89b-12d3-a456-426614174000')
        .expect(200);

      expect(response.body).toEqual(output);
    });
  });

  describe('PATCH /producers/:id', () => {
    it('should update a producer', async () => {
      const dto = { name: 'Jane' };
      const output = { name: 'Jane', document: '12345678909' };
      mockUpdateService.execute.mockResolvedValue(output);

      const response = await request(app.getHttpServer())
        .patch('/producers/123e4567-e89b-12d3-a456-426614174000')
        .send(dto)
        .expect(200);

      expect(response.body).toEqual(output);
    });
  });

  describe('DELETE /producers/:id', () => {
    it('should delete a producer', async () => {
      mockDeleteService.execute.mockResolvedValue(undefined);

      await request(app.getHttpServer())
        .delete('/producers/123e4567-e89b-12d3-a456-426614174000')
        .expect(204);
    });
  });
});
