import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProducerCrop } from '@/producer-crop/producer-crop.entity'

@Injectable()
export class SelectProducerCropByIdRepository {
  constructor(
    @InjectRepository(ProducerCrop)
    private readonly repo: Repository<ProducerCrop>,
  ) {}

  async execute(id: string): Promise<ProducerCrop | null> {
    return this.repo.findOne({ where: { id } })
  }
}