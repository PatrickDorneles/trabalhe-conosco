import { Injectable, Logger } from '@nestjs/common';
import { UpdateProducerInputDTO } from '@/producer/dtos/update-producer-input.dto';
import { GetProducerService } from '@/producer/services/get-producer/get-producer.service';
import { UpdateProducerRepository } from '@/producer/repositories/update-producer/update-producer.repository';

@Injectable()
export class UpdateProducerService {
  private readonly logger = new Logger(UpdateProducerService.name)

  constructor(
    private readonly getProducerService: GetProducerService,
    private readonly updateProducerRepository: UpdateProducerRepository,
  ) { }

  async execute(id: string, dto: UpdateProducerInputDTO) {
    this.logger.log(`Attempting to update producer: ${id}`)

    await this.getProducerService.getById(id)

    const updated = await this.updateProducerRepository.execute(id, dto)

    this.logger.log(`Producer (${id}) updated successfully`)

    return updated
  }
}
