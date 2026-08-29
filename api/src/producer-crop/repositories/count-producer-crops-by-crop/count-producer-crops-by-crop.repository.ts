import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProducerCrop } from '@/producer-crop/producer-crop.entity'

@Injectable()
export class CountProducerCropsByCropRepository {
  constructor(
    @InjectRepository(ProducerCrop)
    private readonly repo: Repository<ProducerCrop>,
  ) { }

  async execute(): Promise<Array<{ crop: string; count: number }>> {
    const rows = await this.repo
      .createQueryBuilder('producerCrop')
      .innerJoin('producerCrop.crop', 'crop')
      .select('crop.name', 'crop')
      .addSelect('COUNT(producerCrop.id)', 'count')
      .where('producerCrop."deletedAt" IS NULL')
      .groupBy('crop.name')
      .orderBy('crop.name')
      .getRawMany()

    return rows.map((row) => ({
      crop: row.crop,
      count: Number(row.count),
    }))
  }
}
