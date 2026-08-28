import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProducerCropInputDTO {
  @ApiPropertyOptional({ example: 'b5cdc875-89d4-4ae6-a2ce-7baf223ee81b', description: 'ID da propriedade' })
  @IsOptional()
  @IsString()
  ruralPropertyId?: string

  @ApiPropertyOptional({ example: 'b5cdc875-89d4-4ae6-a2ce-7baf223ee81b', description: 'ID da safra' })
  @IsOptional()
  @IsString()
  harvestId?: string

  @ApiPropertyOptional({ example: 'Soja', description: 'Nome da cultura' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  cropName?: string
}