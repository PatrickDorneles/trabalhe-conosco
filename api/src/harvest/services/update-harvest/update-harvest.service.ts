import { Injectable, Logger } from '@nestjs/common';
import { UpdateHarvestInputDTO } from '@/harvest/dtos/update-harvest-input.dto';
import { GetHarvestService } from '@/harvest/services/get-harvest/get-harvest.service';
import { UpdateHarvestRepository } from '@/harvest/repositories/update-harvest/update-harvest.repository';

@Injectable()
export class UpdateHarvestService {
  private readonly logger = new Logger(UpdateHarvestService.name)

  constructor(
    private readonly getHarvestService: GetHarvestService,
    private readonly updateHarvestRepository: UpdateHarvestRepository,
  ) { }

  async execute(id: string, dto: UpdateHarvestInputDTO) {
    this.logger.log(`Attempting to update harvest: ${id}`)

    await this.getHarvestService.getById(id)

    const updated = await this.updateHarvestRepository.execute(id, dto)

    this.logger.log(`Harvest (${id}) updated successfully`)

    return updated
  }
}
