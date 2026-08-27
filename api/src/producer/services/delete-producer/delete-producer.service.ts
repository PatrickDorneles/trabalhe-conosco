import { Injectable, Logger } from '@nestjs/common';
import { GetProducerService } from '@/producer/services/get-producer/get-producer.service';
import { DeleteProducerRepository } from '@/producer/repositories/delete-producer/delete-producer.repository';

@Injectable()
export class DeleteProducerService {
  private readonly logger = new Logger(DeleteProducerService.name)

  constructor(
    private readonly getProducerService: GetProducerService,
    private readonly deleteProducerRepository: DeleteProducerRepository,
  ) { }

  async execute(id: string) {
    this.logger.log(`Attempting to delete producer: ${id}`)

    await this.getProducerService.getById(id)

    await this.deleteProducerRepository.execute(id)

    this.logger.log(`Producer (${id}) deleted successfully`)
  }
}
