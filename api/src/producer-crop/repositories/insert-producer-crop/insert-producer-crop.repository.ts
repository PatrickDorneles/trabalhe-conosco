import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProducerCrop } from '@/producer-crop/producer-crop.entity'

@Injectable()
export class InsertProducerCropRepository {
  constructor(
    @InjectRepository(ProducerCrop)
    private readonly repo: Repository<ProducerCrop>,
  ) {}

  async execute(data: Partial<ProducerCrop>): Promise<ProducerCrop> {
    const producerCrop = this.repo.create(data)
    return this.repo.save(producerCrop)
  }
}