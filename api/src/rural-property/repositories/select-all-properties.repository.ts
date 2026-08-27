import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { RuralProperty } from '../rural-property.entity'
import { ListPropertiesFilters } from '../filters/list-properties.filters'
import { PaginationInputDTO } from '../../shared/dtos/pagination-input.dto'
import { PaginationOutputDTO } from '../../shared/dtos/pagination-output.dto'

@Injectable()
export class SelectAllPropertiesRepository {
  constructor(
    @InjectRepository(RuralProperty)
    private readonly repo: Repository<RuralProperty>,
  ) { }

  async execute(
    pagination: PaginationInputDTO,
    filters?: ListPropertiesFilters,
  ): Promise<PaginationOutputDTO<RuralProperty>> {
    const [data, total] = await this.repo.findAndCount({
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      where: {
        ...(filters?.producerId && { producer: { id: filters.producerId } }),
      },
      order: { farmName: 'ASC' },
    })

    return new PaginationOutputDTO(data, total, pagination.page, pagination.limit)
  }
}
