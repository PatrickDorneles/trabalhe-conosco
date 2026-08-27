import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Harvest } from '@/harvest/harvest.entity'

@Injectable()
export class UpdateHarvestRepository {
  constructor(
    @InjectRepository(Harvest)
    private readonly repo: Repository<Harvest>,
  ) { }

  async execute(id: string, data: Partial<Harvest>): Promise<Harvest | null> {
    await this.repo.update(id, data)
    return this.repo.findOne({ where: { id } })
  }
}
