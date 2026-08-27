import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Producer } from '../../producer.entity'

@Injectable()
export class InsertProducerRepository {
  constructor(
    @InjectRepository(Producer)
    private readonly repo: Repository<Producer>,
  ) {}

  async execute(data: Partial<Producer>): Promise<Producer> {
    const producer = this.repo.create(data)
    return this.repo.save(producer)
  }
}
