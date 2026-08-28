import { ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'
import { PaginationInputDTO } from '@/shared/dtos/pagination-input.dto'

export class SearchCropsInputDTO extends PaginationInputDTO {
  @ApiPropertyOptional({ description: 'Termo de busca', example: 'soja' })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  term?: string
}