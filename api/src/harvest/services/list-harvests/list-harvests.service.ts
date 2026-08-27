import { Injectable } from '@nestjs/common';
import { SelectAllHarvestsRepository } from '@/harvest/repositories/select-all-harvests/select-all-harvests.repository';
import { PaginationInputDTO } from '@/shared/dtos/pagination-input.dto';

@Injectable()
export class ListHarvestsService {
  constructor(
    private readonly selectAllHarvestsRepository: SelectAllHarvestsRepository,
  ) { }

  async execute(pagination: PaginationInputDTO) {
    return this.selectAllHarvestsRepository.execute(pagination);
  }
}
