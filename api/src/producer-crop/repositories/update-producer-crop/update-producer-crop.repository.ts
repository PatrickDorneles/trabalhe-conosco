import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProducerCrop } from '@/producer-crop/producer-crop.entity'

@Injectable()
export class UpdateProducerCropRepository {
  constructor(
    @InjectRepository(ProducerCrop)
    private readonly repo: Repository<ProducerCrop>,
  ) {}

  async execute(id: string, data: Partial<ProducerCrop>): Promise<ProducerCrop | null> {
    await this.repo.update(id, data)
    return this.repo.findOne({ where: { id } })
  }
}