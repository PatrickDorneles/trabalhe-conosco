import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return a healthcheck payload', () => {
      const result = appController.getHealthcheck();

      expect(result.status).toBe('ok');
      expect(result).toHaveProperty('version');
      expect(result).toHaveProperty('timestamp');
    });
  });
});
