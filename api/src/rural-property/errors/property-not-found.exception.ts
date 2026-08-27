import { NotFoundException } from '@nestjs/common'

export class PropertyNotFoundException extends NotFoundException {
  constructor() {
    super('properties.not-found')
  }
}
