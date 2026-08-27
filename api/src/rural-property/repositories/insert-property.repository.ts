import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RuralProperty } from '../rural-property.entity'

@Injectable()
export class InsertPropertyRepository {
  constructor(
    @InjectRepository(RuralProperty)
    private readonly repo: Repository<RuralProperty>,
  ) { }

  async execute(data: Partial<RuralProperty>): Promise<RuralProperty> {
    const property = this.repo.create(data)
    return this.repo.save(property)
  }
}
