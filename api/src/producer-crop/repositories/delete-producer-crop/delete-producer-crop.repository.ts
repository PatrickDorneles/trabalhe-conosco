import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProducerCrop } from '@/producer-crop/producer-crop.entity'

@Injectable()
export class DeleteProducerCropRepository {
  constructor(
    @InjectRepository(ProducerCrop)
    private readonly repo: Repository<ProducerCrop>,
  ) {}

  async execute(id: string): Promise<void> {
    await this.repo.softDelete(id)
  }
}