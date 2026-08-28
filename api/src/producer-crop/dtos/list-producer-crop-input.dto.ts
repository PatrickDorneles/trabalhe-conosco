import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsUUID } from 'class-validator'
import { PaginationInputDTO } from '@/shared/dtos/pagination-input.dto'

export class ListProducerCropInputDTO extends PaginationInputDTO {
  @ApiPropertyOptional({ description: 'Filtro por safra' })
  @IsOptional()
  @IsUUID()
  harvestId?: string

  @ApiPropertyOptional({ description: 'Filtro por propriedade' })
  @IsOptional()
  @IsUUID()
  ruralPropertyId?: string

  @ApiPropertyOptional({ description: 'Filtro por produtor' })
  @IsOptional()
  @IsUUID()
  producerId?: string
}