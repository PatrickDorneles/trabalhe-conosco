import { Injectable, Logger } from '@nestjs/common';
import { CreatePropertyInputDTO } from '../../dtos/create-property-input.dto';
import { InsertPropertyRepository } from '../../repositories/insert-property.repository';
import { GetProducerService } from '../../../producers/services/get-producer/get-producer.service';

@Injectable()
export class CreatePropertyService {
  private readonly logger = new Logger(CreatePropertyService.name)

  constructor(
    private readonly insertPropertyRepository: InsertPropertyRepository,
    private readonly getProducerService: GetProducerService,
  ) { }

  async execute(dto: CreatePropertyInputDTO) {
    this.logger.log(`Attempting to create property for producer: ${dto.producerId}`)

    const producer = await this.getProducerService.getById(dto.producerId)

    const property = await this.insertPropertyRepository.execute({
      farmName: dto.farmName,
      city: dto.city,
      state: dto.state,
      totalArea: dto.totalArea,
      arableArea: dto.arableArea,
      vegetationArea: dto.vegetationArea,
      producer,
    })

    this.logger.log(`Property (${property.id}) created successfully for producer: ${dto.producerId}`)
    return property
  }
}
