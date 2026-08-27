import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Harvest } from '@/harvest/harvest.entity'

@Injectable()
export class DeleteHarvestRepository {
  constructor(
    @InjectRepository(Harvest)
    private readonly repo: Repository<Harvest>,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.softDelete(id)
  }
}
