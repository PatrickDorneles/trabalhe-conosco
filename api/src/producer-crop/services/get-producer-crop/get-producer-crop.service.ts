import { Injectable, Logger } from '@nestjs/common';
import { SelectProducerCropByIdRepository } from '@/producer-crop/repositories/select-producer-crop-by-id/select-producer-crop-by-id.repository';
import { ProducerCropNotFoundException } from '@/producer-crop/errors/producer-crop-not-found.exception';

@Injectable()
export class GetProducerCropService {
  private readonly logger = new Logger(GetProducerCropService.name)

  constructor(
    private readonly selectProducerCropByIdRepository: SelectProducerCropByIdRepository,
  ) {}

  async getById(id: string) {
    const producerCrop = await this.selectProducerCropByIdRepository.execute(id)

    if (!producerCrop) {
      this.logger.warn(`ProducerCrop not found: id ${id}`)
      throw new ProducerCropNotFoundException()
    }

    return producerCrop
  }
}