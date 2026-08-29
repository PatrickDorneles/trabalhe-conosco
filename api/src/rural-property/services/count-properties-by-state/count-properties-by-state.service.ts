import { Injectable, Logger } from '@nestjs/common'
import { CountPropertiesByStateRepository } from '@/rural-property/repositories/count-properties-by-state.repository'

@Injectable()
export class CountPropertiesByStateService {
  private readonly logger = new Logger(CountPropertiesByStateService.name)

  constructor(
    private readonly countPropertiesByStateRepository: CountPropertiesByStateRepository,
  ) { }

  async execute(): Promise<Array<{ state: string; count: number }>> {
    const result = await this.countPropertiesByStateRepository.execute()

    this.logger.log(`Counted properties by state across ${result.length} states`)

    return result
  }
}
