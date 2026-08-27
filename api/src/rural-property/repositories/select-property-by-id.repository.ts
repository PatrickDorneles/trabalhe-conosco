import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RuralProperty } from '@/rural-property/rural-property.entity'

@Injectable()
export class SelectPropertyByIdRepository {
  constructor(
    @InjectRepository(RuralProperty)
    private readonly repo: Repository<RuralProperty>,
  ) { }

  async execute(id: string): Promise<RuralProperty | null> {
    return this.repo.findOne({ where: { id } })
  }
}
