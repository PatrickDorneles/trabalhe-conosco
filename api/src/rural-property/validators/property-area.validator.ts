import { Injectable, Logger } from '@nestjs/common'
import { PropertyInvalidAreaException } from '@/rural-property/errors/property-invalid-area.exception'

@Injectable()
export class PropertyAreaValidator {
  private readonly logger = new Logger(PropertyAreaValidator.name)

  execute(areas: {
    totalArea: number
    arableArea: number
    vegetationArea: number
  }): void {
    if (areas.totalArea >= areas.arableArea + areas.vegetationArea) {
      return
    }

    this.logger.warn(
      `Invalid property area: totalArea (${areas.totalArea}) must be >= arableArea (${areas.arableArea}) + vegetationArea (${areas.vegetationArea})`,
    )
    throw new PropertyInvalidAreaException()
  }
}
