import { Injectable, Logger } from '@nestjs/common';
import { CreateHarvestInputDTO } from '@/harvest/dtos/create-harvest-input.dto';
import { InsertHarvestRepository } from '@/harvest/repositories/insert-harvest/insert-harvest.repository';

@Injectable()
export class CreateHarvestService {
  private readonly logger = new Logger(CreateHarvestService.name)

  constructor(
    private readonly insertHarvestRepository: InsertHarvestRepository,
  ) { }

  async execute(dto: CreateHarvestInputDTO) {
    this.logger.log(`Attempting to create harvest for year: ${dto.year}`)

    const harvest = await this.insertHarvestRepository.execute({
      year: dto.year,
    })

    this.logger.log(`Harvest (${harvest.id}) created successfully`)
    return harvest
  }
}
