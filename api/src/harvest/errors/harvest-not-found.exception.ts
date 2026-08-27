import { NotFoundException } from '@nestjs/common'

export class HarvestNotFoundException extends NotFoundException {
  constructor() {
    super('harvests.not-found')
  }
}
