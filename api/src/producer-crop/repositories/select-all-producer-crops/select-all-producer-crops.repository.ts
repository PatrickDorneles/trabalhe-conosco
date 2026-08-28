import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProducerCrop } from '@/producer-crop/producer-crop.entity'
import { PaginationInputDTO } from '@/shared/dtos/pagination-input.dto'
import { PaginationOutputDTO } from '@/shared/dtos/pagination-output.dto'

export interface SelectAllProducerCropsFilters {
  harvestId?: string
  ruralPropertyId?: string
  producerId?: string
}

@Injectable()
export class SelectAllProducerCropsRepository {
  constructor(
    @InjectRepository(ProducerCrop)
    private readonly repo: Repository<ProducerCrop>,
  ) {}

  async execute(
    filters: SelectAllProducerCropsFilters,
    pagination: PaginationInputDTO,
  ): Promise<PaginationOutputDTO<ProducerCrop>> {
    const query = this.repo
      .createQueryBuilder('producerCrop')
      .leftJoinAndSelect('producerCrop.ruralProperty', 'ruralProperty')
      .leftJoinAndSelect('producerCrop.harvest', 'harvest')
      .leftJoinAndSelect('producerCrop.crop', 'crop')
      .where('producerCrop."deletedAt" IS NULL')
      .orderBy('producerCrop."createdAt"', 'DESC')

    if (filters.harvestId) {
      query.andWhere('harvest.id = :harvestId', { harvestId: filters.harvestId })
    }

    if (filters.ruralPropertyId) {
      query.andWhere('ruralProperty.id = :ruralPropertyId', {
        ruralPropertyId: filters.ruralPropertyId,
      })
    }

    if (filters.producerId) {
      query
        .innerJoin('ruralProperty.producer', 'producer')
        .andWhere('producer.id = :producerId', { producerId: filters.producerId })
    }

    query
      .skip((pagination.page - 1) * pagination.limit)
      .take(pagination.limit)

    const [data, total] = await Promise.all([
      query.getMany(),
      query.clone().orderBy().skip(0).take(0).getCount(),
    ])

    return new PaginationOutputDTO(data, total, pagination.page, pagination.limit)
  }
}