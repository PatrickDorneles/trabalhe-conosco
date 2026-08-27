import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RuralProperty } from '../rural-property.entity'

@Injectable()
export class UpdatePropertyRepository {
  constructor(
    @InjectRepository(RuralProperty)
    private readonly repo: Repository<RuralProperty>,
  ) { }

  async execute(id: string, data: Partial<RuralProperty>): Promise<RuralProperty | null> {
    await this.repo.update(id, data)
    return this.repo.findOne({ where: { id } })
  }
}
