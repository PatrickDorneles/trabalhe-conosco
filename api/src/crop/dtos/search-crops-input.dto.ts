import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { PaginationInputDTO } from '@/shared/dtos/pagination-input.dto'

export class SearchCropsInputDTO extends PaginationInputDTO {
  @ApiPropertyOptional({ description: 'Termo de busca', example: 'soja' })
  @IsOptional()
  @IsString()
  term?: string
}