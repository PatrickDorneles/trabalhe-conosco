import { Test, TestingModule } from '@nestjs/testing';
import { UpdateProducerCropService } from './update-producer-crop.service';

describe('UpdateProducerCropService', () => {
  let service: UpdateProducerCropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateProducerCropService],
    }).compile();

    service = module.get<UpdateProducerCropService>(UpdateProducerCropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
