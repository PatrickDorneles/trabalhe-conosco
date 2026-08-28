import { Injectable } from '@nestjs/common';
import { SearchCropsRepository } from '@/crop/repositories/search-crops/search-crops.repository';
import { PaginationInputDTO } from '@/shared/dtos/pagination-input.dto';

@Injectable()
export class SearchCropsService {
  constructor(
    private readonly searchCropsRepository: SearchCropsRepository,
  ) { }

  async execute(term: string, pagination: PaginationInputDTO) {
    return this.searchCropsRepository.execute(term, pagination);
  }
}