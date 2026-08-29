import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RuralProperty } from '@/rural-property/rural-property.entity'

@Injectable()
export class CountPropertiesByStateRepository {
  constructor(
    @InjectRepository(RuralProperty)
    private readonly repo: Repository<RuralProperty>,
  ) { }

  async execute(): Promise<Array<{ state: string; count: number }>> {
    const rows = await this.repo
      .createQueryBuilder('property')
      .select('property.state', 'state')
      .addSelect('COUNT(property.id)', 'count')
      .where('property."deletedAt" IS NULL')
      .groupBy('property.state')
      .orderBy('property.state')
      .getRawMany()

    return rows.map((row) => ({
      state: row.state,
      count: Number(row.count),
    }))
  }
}