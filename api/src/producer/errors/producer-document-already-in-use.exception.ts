import { ConflictException } from '@nestjs/common'

export class ProducerDocumentAlreadyInUseException extends ConflictException {
  constructor() {
    super('producers.document-already-exists')
  }
}
