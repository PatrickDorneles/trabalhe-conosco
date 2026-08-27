import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreatePropertyInputDTO {
  @ApiProperty({ example: 'Fazenda Boa Vista', description: 'Nome da propriedade' })
  @IsDefined()
  @IsString()
  @MinLength(3)
  farmName: string

  @ApiProperty({ example: 'Uberlândia', description: 'Cidade' })
  @IsDefined()
  @IsString()
  @MinLength(2)
  city: string

  @ApiProperty({ example: 'MG', description: 'UF (sigla do estado)' })
  @IsDefined()
  @IsString()
  @MinLength(2)
  state: string

  @ApiProperty({ example: 1200.5, description: 'Área total em hectares' })
  @IsDefined()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  totalArea: number

  @ApiProperty({ example: 800.25, description: 'Área agricultável em hectares' })
  @IsDefined()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  arableArea: number

  @ApiProperty({ example: 200.5, description: 'Área de vegetação em hectares' })
  @IsDefined()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  vegetationArea: number

  @ApiProperty({ example: 'b5cdc875-89d4-4ae6-a2ce-7baf223ee81b', description: 'ID do produtor' })
  @IsDefined()
  @IsString()
  producerId: string
}
