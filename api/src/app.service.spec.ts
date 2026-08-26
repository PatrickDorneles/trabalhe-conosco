import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';


describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getHealthcheck', () => {
    it('should return status ok', () => {
      const result = service.getHealthcheck();
      expect(result.status).toBe('ok');
    });

    it('should return version', () => {
      const result = service.getHealthcheck();
      expect(result.version).toBe('0.0.1');
    });

    it('should return a valid ISO timestamp', () => {
      const result = service.getHealthcheck();
      expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
    });

    it('should return uptime as a number', () => {
      const result = service.getHealthcheck();
      expect(typeof result.uptime).toBe('number');
      expect(result.uptime).toBeGreaterThanOrEqual(0);
    });

    it('should return environment from NODE_ENV or default to development', () => {
      const originalEnv = process.env.NODE_ENV;
      const result = service.getHealthcheck();
      expect(result.environment).toBe(originalEnv || 'development');
    });

    it('should return an object with all expected keys', () => {
      const result = service.getHealthcheck();
      expect(result).toEqual({
        status: expect.any(String),
        version: expect.any(String),
        timestamp: expect.any(String),
        uptime: expect.any(Number),
        environment: expect.any(String),
      });
    });
  });
});
