import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Producer } from '@/producer/producer.entity'

@Injectable()
export class SelectProducerByIdRepository {
  constructor(
    @InjectRepository(Producer)
    private readonly repo: Repository<Producer>,
  ) {}

  async execute(id: string): Promise<Producer | null> {
    return this.repo.findOne({ where: { id } })
  }
}
