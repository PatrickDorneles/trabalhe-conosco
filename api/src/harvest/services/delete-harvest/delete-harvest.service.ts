import { Injectable, Logger } from '@nestjs/common';
import { GetHarvestService } from '@/harvest/services/get-harvest/get-harvest.service';
import { DeleteHarvestRepository } from '@/harvest/repositories/delete-harvest/delete-harvest.repository';

@Injectable()
export class DeleteHarvestService {
  private readonly logger = new Logger(DeleteHarvestService.name)

  constructor(
    private readonly getHarvestService: GetHarvestService,
    private readonly deleteHarvestRepository: DeleteHarvestRepository,
  ) { }

  async execute(id: string) {
    this.logger.log(`Attempting to delete harvest: ${id}`)

    await this.getHarvestService.getById(id)

    await this.deleteHarvestRepository.execute(id)

    this.logger.log(`Harvest (${id}) deleted successfully`)
  }
}