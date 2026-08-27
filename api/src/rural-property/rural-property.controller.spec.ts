import { Test, TestingModule } from '@nestjs/testing';
import { RuralPropertyController } from './rural-property.controller';

describe('RuralPropertyController', () => {
  let controller: RuralPropertyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuralPropertyController],
    }).compile();

    controller = module.get<RuralPropertyController>(RuralPropertyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
