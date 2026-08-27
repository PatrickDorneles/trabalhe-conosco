import { Injectable, Logger } from '@nestjs/common';
import { SelectPropertyByIdRepository } from '../../repositories/select-property-by-id.repository';
import { PropertyNotFoundException } from '../../errors/property-not-found.exception';

@Injectable()
export class GetPropertyService {
  private readonly logger = new Logger(GetPropertyService.name)

  constructor(
    private readonly selectPropertyByIdRepository: SelectPropertyByIdRepository,
  ) { }

  async getById(id: string) {
    const property = await this.selectPropertyByIdRepository.execute(id)

    if (!property) {
      this.logger.warn(`Property not found: id ${id}`)
      throw new PropertyNotFoundException()
    }

    return property
  }
}
