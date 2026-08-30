import { Injectable, Logger } from '@nestjs/common'
import { CountPropertiesRepository } from '@/rural-property/repositories/count-properties.repository'

@Injectable()
export class CountPropertiesService {
  private readonly logger = new Logger(CountPropertiesService.name)

  constructor(
    private readonly countPropertiesRepository: CountPropertiesRepository,
  ) { }

  async execute(): Promise<number> {
    const result = await this.countPropertiesRepository.execute()

    this.logger.log(`Counted properties: ${result}`)

    return result
  }
}
