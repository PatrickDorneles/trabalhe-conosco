import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class UpdatePropertyInputDTO {
  @ApiPropertyOptional({ example: 'Fazenda Boa Vista', description: 'Nome da propriedade' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  farmName?: string

  @ApiPropertyOptional({ example: 'Uberlândia', description: 'Cidade' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  city?: string

  @ApiPropertyOptional({ example: 'MG', description: 'UF (sigla do estado)' })
  @IsOptional()
  @IsString()
  @MinLength(2)
  state?: string

  @ApiPropertyOptional({ example: 1200.5, description: 'Área total em hectares' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  totalArea?: number

  @ApiPropertyOptional({ example: 800.25, description: 'Área agricultável em hectares' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  arableArea?: number

  @ApiPropertyOptional({ example: 200.5, description: 'Área de vegetação em hectares' })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  vegetationArea?: number
}
