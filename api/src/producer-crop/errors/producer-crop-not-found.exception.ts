import { NotFoundException } from '@nestjs/common'

export class ProducerCropNotFoundException extends NotFoundException {
  constructor() {
    super('producer-crops.not-found')
  }
}