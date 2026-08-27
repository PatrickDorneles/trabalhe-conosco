import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Harvest } from '@/harvest/harvest.entity'

@Injectable()
export class SelectHarvestByIdRepository {
  constructor(
    @InjectRepository(Harvest)
    private readonly repo: Repository<Harvest>,
  ) {}

  async execute(id: string): Promise<Harvest | null> {
    return this.repo.findOne({ where: { id } })
  }
}
