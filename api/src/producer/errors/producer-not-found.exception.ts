import { NotFoundException } from '@nestjs/common'

export class ProducerNotFoundException extends NotFoundException {
  constructor() {
    super('producers.not-found')
  }
}
