import { Injectable, Logger } from '@nestjs/common';
import { SelectAllPropertiesRepository } from '@/rural-property/repositories/select-all-properties.repository';
import { PaginationInputDTO } from '@/shared/dtos/pagination-input.dto';
import { ListPropertiesFilters } from '@/rural-property/filters/list-properties.filters';

@Injectable()
export class ListPropertiesService {
  private readonly logger = new Logger(ListPropertiesService.name)

  constructor(
    private readonly selectAllPropertiesRepository: SelectAllPropertiesRepository,
  ) { }

  async execute(pagination: PaginationInputDTO, filters?: ListPropertiesFilters) {
    this.logger.log(`Listing properties (page ${pagination.page}, limit ${pagination.limit})`)

    return this.selectAllPropertiesRepository.execute(pagination, filters)
  }
}
