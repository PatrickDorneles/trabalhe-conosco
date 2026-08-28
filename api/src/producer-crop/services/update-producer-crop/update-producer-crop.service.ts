import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UpdateProducerCropInputDTO } from '@/producer-crop/dtos/update-producer-crop-input.dto';
import { GetProducerCropService } from '@/producer-crop/services/get-producer-crop/get-producer-crop.service';
import { UpdateProducerCropRepository } from '@/producer-crop/repositories/update-producer-crop/update-producer-crop.repository';
import { GetPropertyService } from '@/rural-property/services/get-property/get-property.service';
import { GetHarvestService } from '@/harvest/services/get-harvest/get-harvest.service';
import { CreateCropService } from '@/crop/services/create-crop/create-crop.service';
import { ProducerCrop } from '@/producer-crop/producer-crop.entity';

@Injectable()
export class UpdateProducerCropService {
  private readonly logger = new Logger(UpdateProducerCropService.name)

  constructor(
    private readonly updateProducerCropRepository: UpdateProducerCropRepository,
    private readonly getProducerCropService: GetProducerCropService,
    private readonly getPropertyService: GetPropertyService,
    private readonly getHarvestService: GetHarvestService,
    private readonly createCropService: CreateCropService,
  ) {}

  async execute(id: string, dto: UpdateProducerCropInputDTO) {
    this.logger.log(`Attempting to update producer-crop: ${id}`)

    await this.getProducerCropService.getById(id)

    const data: Partial<ProducerCrop> = {}

    if (dto.ruralPropertyId !== undefined) {
      data.ruralProperty = await this.getPropertyService.getById(dto.ruralPropertyId)
    }

    if (dto.harvestId !== undefined) {
      data.harvest = await this.getHarvestService.getById(dto.harvestId)
    }

    if (dto.cropName !== undefined) {
      data.crop = await this.createCropService.execute({ name: dto.cropName })
    }

    if (Object.keys(data).length === 0) {
      this.logger.warn(`No fields to update for producer-crop: ${id}`)
      throw new BadRequestException('producer-crops.no-fields-to-update')
    }

    const updated = await this.updateProducerCropRepository.execute(id, data)

    this.logger.log(`ProducerCrop (${id}) updated successfully`)

    return updated
  }
}