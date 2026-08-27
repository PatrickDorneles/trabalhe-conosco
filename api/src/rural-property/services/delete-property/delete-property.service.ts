import { Injectable, Logger } from '@nestjs/common';
import { GetPropertyService } from '../get-property/get-property.service';
import { DeletePropertyRepository } from '../../repositories/delete-property.repository';

@Injectable()
export class DeletePropertyService {
  private readonly logger = new Logger(DeletePropertyService.name)

  constructor(
    private readonly getPropertyService: GetPropertyService,
    private readonly deletePropertyRepository: DeletePropertyRepository,
  ) { }

  async execute(id: string) {
    this.logger.log(`Attempting to delete property: ${id}`)

    await this.getPropertyService.getById(id)

    await this.deletePropertyRepository.execute(id)

    this.logger.log(`Property (${id}) deleted successfully`)
  }
}
