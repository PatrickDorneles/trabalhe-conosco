import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Producer } from '@/producer/producer.entity'

@Injectable()
export class SelectProducerByDocumentRepository {
  constructor(
    @InjectRepository(Producer)
    private readonly repo: Repository<Producer>,
  ) {}

  async execute(document: string): Promise<Producer | null> {
    return this.repo.findOne({ where: { document } })
  }
}
