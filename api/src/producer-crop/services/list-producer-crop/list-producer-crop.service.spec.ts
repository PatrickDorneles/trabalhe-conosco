import { Test, TestingModule } from '@nestjs/testing';
import { ListProducerCropService } from './list-producer-crop.service';

describe('ListProducerCropService', () => {
  let service: ListProducerCropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListProducerCropService],
    }).compile();

    service = module.get<ListProducerCropService>(ListProducerCropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
