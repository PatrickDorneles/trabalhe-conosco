import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RuralProperty } from '@/rural-property/rural-property.entity'

@Injectable()
export class CountLandUseByTypeRepository {
  constructor(
    @InjectRepository(RuralProperty)
    private readonly repo: Repository<RuralProperty>,
  ) { }

  async execute(): Promise<{ arableArea: number; vegetationArea: number }> {
    const rows = await this.repo
      .createQueryBuilder('property')
      .select('SUM(property.arableArea)', 'arableArea')
      .addSelect('SUM(property.vegetationArea)', 'vegetationArea')
      .where('property."deletedAt" IS NULL')
      .getRawMany()

    const row = rows[0]

    return {
      arableArea: Number(row.arableArea ?? 0),
      vegetationArea: Number(row.vegetationArea ?? 0),
    }
  }
}