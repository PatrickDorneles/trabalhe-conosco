import { Injectable, Logger } from '@nestjs/common';
import { UpdatePropertyInputDTO } from '@/rural-property/dtos/update-property-input.dto';
import { GetPropertyService } from '@/rural-property/services/get-property/get-property.service';
import { UpdatePropertyRepository } from '@/rural-property/repositories/update-property.repository';
import { PropertyAreaValidator } from '@/rural-property/validators/property-area.validator';

@Injectable()
export class UpdatePropertyService {
  private readonly logger = new Logger(UpdatePropertyService.name)

  constructor(
    private readonly getPropertyService: GetPropertyService,
    private readonly updatePropertyRepository: UpdatePropertyRepository,
    private readonly propertyAreaValidator: PropertyAreaValidator,
  ) { }

  async execute(id: string, dto: UpdatePropertyInputDTO) {
    this.logger.log(`Attempting to update property: ${id}`)

    const property = await this.getPropertyService.getById(id)

    this.propertyAreaValidator.execute({
      totalArea: dto.totalArea ?? property.totalArea,
      arableArea: dto.arableArea ?? property.arableArea,
      vegetationArea: dto.vegetationArea ?? property.vegetationArea,
    })

    const updated = await this.updatePropertyRepository.execute(id, dto)

    this.logger.log(`Property (${id}) updated successfully`)

    return updated
  }
}
