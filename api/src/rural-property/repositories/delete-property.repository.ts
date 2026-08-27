import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RuralProperty } from '../rural-property.entity'

@Injectable()
export class DeletePropertyRepository {
  constructor(
    @InjectRepository(RuralProperty)
    private readonly repo: Repository<RuralProperty>,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.softDelete(id)
  }
}
