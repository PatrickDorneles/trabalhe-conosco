import { Injectable, Logger } from '@nestjs/common';
import { UpdatePropertyInputDTO } from '../../dtos/update-property-input.dto';
import { GetPropertyService } from '../get-property/get-property.service';
import { UpdatePropertyRepository } from '../../repositories/update-property.repository';

@Injectable()
export class UpdatePropertyService {
  private readonly logger = new Logger(UpdatePropertyService.name)

  constructor(
    private readonly getPropertyService: GetPropertyService,
    private readonly updatePropertyRepository: UpdatePropertyRepository,
  ) { }

  async execute(id: string, dto: UpdatePropertyInputDTO) {
    this.logger.log(`Attempting to update property: ${id}`)

    await this.getPropertyService.getById(id)

    const updated = await this.updatePropertyRepository.execute(id, dto)

    this.logger.log(`Property (${id}) updated successfully`)

    return updated
  }
}
