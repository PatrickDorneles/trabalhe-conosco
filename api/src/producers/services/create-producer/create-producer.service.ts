import { Injectable, Logger } from '@nestjs/common';
import { CreateProducerInputDTO } from '../../dtos/create-producer-input.dto';
import { InsertProducerRepository } from '../../repositories/insert-producer/insert-producer.repository';
import { GetProducerService } from '../get-producer/get-producer.service';
import { ProducerDocumentAlreadyInUseException } from '../../errors/producer-document-already-in-use.exception';

@Injectable()
export class CreateProducerService {
  private readonly logger = new Logger(CreateProducerService.name)

  constructor(
    private readonly insertProducerRepository: InsertProducerRepository,
    private readonly getProducerService: GetProducerService,
  ) { }

  async execute(dto: CreateProducerInputDTO) {
    const document = dto.document.replace(/\D/g, '')
    this.logger.log(`Attempting to create producer with document: ${document}`)

    const existing = await this.getProducerService
      .getByDocument(document)
      .catch(() => undefined)

    if (existing) {
      this.logger.error(`Document (${document}) already in use by producer: ${existing.id}`)
      throw new ProducerDocumentAlreadyInUseException()
    }

    const producer = await this.insertProducerRepository.execute({
      name: dto.name,
      document,
    })

    this.logger.log(`Producer (${document}) created successfully`)
    return producer
  }
}
