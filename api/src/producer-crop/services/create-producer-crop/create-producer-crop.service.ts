import { Injectable, Logger } from '@nestjs/common';
import { CreateProducerCropInputDTO } from '@/producer-crop/dtos/create-producer-crop-input.dto';
import { InsertProducerCropRepository } from '@/producer-crop/repositories/insert-producer-crop/insert-producer-crop.repository';
import { GetPropertyService } from '@/rural-property/services/get-property/get-property.service';
import { GetHarvestService } from '@/harvest/services/get-harvest/get-harvest.service';
import { CreateCropService } from '@/crop/services/create-crop/create-crop.service';

@Injectable()
export class CreateProducerCropService {
  private readonly logger = new Logger(CreateProducerCropService.name)

  constructor(
    private readonly insertProducerCropRepository: InsertProducerCropRepository,
    private readonly getPropertyService: GetPropertyService,
    private readonly getHarvestService: GetHarvestService,
    private readonly createCropService: CreateCropService,
  ) { }

  async execute(dto: CreateProducerCropInputDTO) {
    this.logger.log(
      `Attempting to link crop to property ${dto.ruralPropertyId} and harvest ${dto.harvestId}`,
    )

    const property = await this.getPropertyService.getById(dto.ruralPropertyId)
    const harvest = await this.getHarvestService.getById(dto.harvestId)
    const crop = await this.createCropService.execute({ name: dto.cropName })

    const producerCrop = await this.insertProducerCropRepository.execute({
      ruralProperty: property,
      harvest,
      crop,
    })

    this.logger.log(
      `ProducerCrop (${producerCrop.id}) created for property ${property.id} and harvest ${harvest.id}`,
    )
    return producerCrop
  }
}
