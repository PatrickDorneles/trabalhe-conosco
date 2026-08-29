import { Injectable, Logger } from '@nestjs/common'
import { CountProducerCropsByCropRepository } from '@/producer-crop/repositories/count-producer-crops-by-crop/count-producer-crops-by-crop.repository'

@Injectable()
export class CountProducerCropsByCropService {
  private readonly logger = new Logger(CountProducerCropsByCropService.name)

  constructor(
    private readonly countProducerCropsByCropRepository: CountProducerCropsByCropRepository,
  ) { }

  async execute(): Promise<Array<{ crop: string; count: number }>> {
    const result = await this.countProducerCropsByCropRepository.execute()

    this.logger.log(`Counted producer crops by crop across ${result.length} crops`)

    return result
  }
}
