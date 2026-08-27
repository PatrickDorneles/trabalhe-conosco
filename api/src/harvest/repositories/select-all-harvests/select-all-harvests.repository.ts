import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Harvest } from '@/harvest/harvest.entity'
import { PaginationInputDTO } from '@/shared/dtos/pagination-input.dto'
import { PaginationOutputDTO } from '@/shared/dtos/pagination-output.dto'

@Injectable()
export class SelectAllHarvestsRepository {
  constructor(
    @InjectRepository(Harvest)
    private readonly repo: Repository<Harvest>,
  ) { }

  async execute(
    pagination: PaginationInputDTO,
  ): Promise<PaginationOutputDTO<Harvest>> {
    const [data, total] = await this.repo.findAndCount({
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      order: { year: 'DESC' },
    })

    return new PaginationOutputDTO(data, total, pagination.page, pagination.limit)
  }
}
