import { Injectable, Logger } from '@nestjs/common'
import { CountLandUseByTypeRepository } from '@/rural-property/repositories/count-land-use-by-type.repository'

@Injectable()
export class CountLandUseByTypeService {
  private readonly logger = new Logger(CountLandUseByTypeService.name)

  constructor(
    private readonly countLandUseByTypeRepository: CountLandUseByTypeRepository,
  ) { }

  async execute(): Promise<{ arableArea: number; vegetationArea: number }> {
    const result = await this.countLandUseByTypeRepository.execute()

    this.logger.log(
      `Counted land use `,
    )

    return result
  }
}
