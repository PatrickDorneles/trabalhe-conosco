import { Injectable, Logger } from '@nestjs/common'
import { SumTotalAreaRepository } from '@/rural-property/repositories/sum-total-area.repository'

@Injectable()
export class SumTotalAreaService {
  private readonly logger = new Logger(SumTotalAreaService.name)

  constructor(
    private readonly sumTotalAreaRepository: SumTotalAreaRepository,
  ) { }

  async execute(): Promise<number> {
    const result = await this.sumTotalAreaRepository.execute()

    this.logger.log(`Summed total area of properties: ${result}`)

    return result
  }
}
