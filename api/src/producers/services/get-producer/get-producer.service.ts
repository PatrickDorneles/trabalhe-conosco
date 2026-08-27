import { Injectable, Logger } from '@nestjs/common';
import { SelectProducerByIdRepository } from '../../repositories/select-producer-by-id/select-producer-by-id.repository';
import { SelectProducerByDocumentRepository } from '../../repositories/select-producer-by-document/select-producer-by-document.repository';
import { ProducerNotFoundException } from '../../errors/producer-not-found.exception';

@Injectable()
export class GetProducerService {
  private readonly logger = new Logger(GetProducerService.name)

  constructor(
    private readonly selectProducerByIdRepository: SelectProducerByIdRepository,
    private readonly selectProducerByDocumentRepository: SelectProducerByDocumentRepository,
  ) { }

  async getById(id: string) {
    const producer = await this.selectProducerByIdRepository.execute(id)

    if (!producer) {
      this.logger.warn(`Producer not found: id ${id}`)
      throw new ProducerNotFoundException()
    }

    return producer
  }

  async getByDocument(document: string) {
    const producer = await this.selectProducerByDocumentRepository.execute(document)

    if (!producer) {
      this.logger.warn(`Producer not found: document ${document}`)
      throw new ProducerNotFoundException()
    }

    return producer
  }
}
