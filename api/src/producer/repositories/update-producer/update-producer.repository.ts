import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Producer } from '@/producer/producer.entity'

@Injectable()
export class UpdateProducerRepository {
  constructor(
    @InjectRepository(Producer)
    private readonly repo: Repository<Producer>,
  ) {}

  async execute(id: string, data: Partial<Producer>): Promise<Producer | null> {
    await this.repo.update(id, data)
    return this.repo.findOne({ where: { id } })
  }
}
