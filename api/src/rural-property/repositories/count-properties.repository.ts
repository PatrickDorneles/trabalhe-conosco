import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RuralProperty } from '@/rural-property/rural-property.entity'

@Injectable()
export class CountPropertiesRepository {
  constructor(
    @InjectRepository(RuralProperty)
    private readonly repo: Repository<RuralProperty>,
  ) { }

  async execute(): Promise<number> {
    return this.repo.count()
  }
}
