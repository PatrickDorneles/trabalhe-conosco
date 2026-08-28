import { Injectable, Logger } from '@nestjs/common';
import { GetProducerCropService } from '@/producer-crop/services/get-producer-crop/get-producer-crop.service';
import { DeleteProducerCropRepository } from '@/producer-crop/repositories/delete-producer-crop/delete-producer-crop.repository';

@Injectable()
export class DeleteProducerCropService {
  private readonly logger = new Logger(DeleteProducerCropService.name)

  constructor(
    private readonly getProducerCropService: GetProducerCropService,
    private readonly deleteProducerCropRepository: DeleteProducerCropRepository,
  ) {}

  async execute(id: string) {
    this.logger.log(`Attempting to delete producer-crop: ${id}`)

    await this.getProducerCropService.getById(id)

    await this.deleteProducerCropRepository.execute(id)

    this.logger.log(`ProducerCrop (${id}) deleted successfully`)
  }
}