import { Injectable, Logger } from '@nestjs/common';
import { SelectHarvestByIdRepository } from '@/harvest/repositories/select-harvest-by-id/select-harvest-by-id.repository';
import { HarvestNotFoundException } from '@/harvest/errors/harvest-not-found.exception';

@Injectable()
export class GetHarvestService {
  private readonly logger = new Logger(GetHarvestService.name)

  constructor(
    private readonly selectHarvestByIdRepository: SelectHarvestByIdRepository,
  ) { }

  async getById(id: string) {
    const harvest = await this.selectHarvestByIdRepository.execute(id)

    if (!harvest) {
      this.logger.warn(`Harvest not found: id ${id}`)
      throw new HarvestNotFoundException()
    }

    return harvest
  }
}
