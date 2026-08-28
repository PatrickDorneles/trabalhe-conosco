import { Test, TestingModule } from '@nestjs/testing';
import { ProducerCropController } from './producer-crop.controller';

describe('ProducerCropController', () => {
  let controller: ProducerCropController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducerCropController],
    }).compile();

    controller = module.get<ProducerCropController>(ProducerCropController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
