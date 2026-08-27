import { Injectable } from '@nestjs/common';
import { SelectAllProducersRepository } from '@/producer/repositories/select-all-producers/select-all-producers.repository';
import { PaginationInputDTO } from '@/shared/dtos/pagination-input.dto';

@Injectable()
export class ListProducersService {
  constructor(
    private readonly selectAllProducersRepository: SelectAllProducersRepository,
  ) {}

  async execute(pagination: PaginationInputDTO) {
    return this.selectAllProducersRepository.execute(pagination);
  }
}
