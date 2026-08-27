import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class UpdateHarvestInputDTO {
  @ApiPropertyOptional({ example: 2024, description: 'Ano da safra' })
  @IsOptional()
  @IsInt()
  @Min(1900)
  @Max(2100)
  year?: number
}