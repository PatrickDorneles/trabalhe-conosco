import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Producer } from '../../producer.entity'
import { PaginationInputDTO } from '../../../shared/dtos/pagination-input.dto'
import { PaginationOutputDTO } from '../../../shared/dtos/pagination-output.dto'

@Injectable()
export class SelectAllProducersRepository {
  constructor(
    @InjectRepository(Producer)
    private readonly repo: Repository<Producer>,
  ) { }

  async execute(
    pagination: PaginationInputDTO,
  ): Promise<PaginationOutputDTO<Producer>> {
    const [data, total] = await this.repo.findAndCount({
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      order: { name: 'ASC' },
    })

    return new PaginationOutputDTO(data, total, pagination.page, pagination.limit)
  }
}
