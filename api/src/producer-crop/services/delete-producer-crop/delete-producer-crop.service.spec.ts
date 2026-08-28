import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProducerCropService } from './delete-producer-crop.service';

describe('DeleteProducerCropService', () => {
  let service: DeleteProducerCropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteProducerCropService],
    }).compile();

    service = module.get<DeleteProducerCropService>(DeleteProducerCropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
