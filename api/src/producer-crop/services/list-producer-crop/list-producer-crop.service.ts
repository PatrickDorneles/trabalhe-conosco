import { Injectable } from '@nestjs/common';
import { SelectAllProducerCropsRepository } from '@/producer-crop/repositories/select-all-producer-crops/select-all-producer-crops.repository';
import { ListProducerCropInputDTO } from '@/producer-crop/dtos/list-producer-crop-input.dto';

@Injectable()
export class ListProducerCropService {
  constructor(
    private readonly selectAllProducerCropsRepository: SelectAllProducerCropsRepository,
  ) { }

  async execute(dto: ListProducerCropInputDTO) {
    return this.selectAllProducerCropsRepository.execute(
      {
        harvestId: dto.harvestId,
        ruralPropertyId: dto.ruralPropertyId,
        producerId: dto.producerId,
      },
      dto,
    )
  }
}
