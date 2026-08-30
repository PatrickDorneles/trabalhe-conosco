import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RuralProperty } from '@/rural-property/rural-property.entity'

@Injectable()
export class SumTotalAreaRepository {
  constructor(
    @InjectRepository(RuralProperty)
    private readonly repo: Repository<RuralProperty>,
  ) { }

  async execute(): Promise<number> {
    const totalArea = await this.repo.sum('totalArea')

    return totalArea ?? 0
  }
}
