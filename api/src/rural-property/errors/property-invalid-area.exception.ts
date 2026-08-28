import { BadRequestException } from '@nestjs/common'

export class PropertyInvalidAreaException extends BadRequestException {
  constructor() {
    super('properties.invalid-area')
  }
}
