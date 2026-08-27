import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Harvest } from '@/harvest/harvest.entity'

@Injectable()
export class InsertHarvestRepository {
  constructor(
    @InjectRepository(Harvest)
    private readonly repo: Repository<Harvest>,
  ) { }

  async execute(data: Partial<Harvest>): Promise<Harvest> {
    const harvest = this.repo.create(data)
    return this.repo.save(harvest)
  }
}
