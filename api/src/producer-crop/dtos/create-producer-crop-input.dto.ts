import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateProducerCropInputDTO {
  @ApiProperty({ example: 'b5cdc875-89d4-4ae6-a2ce-7baf223ee81b', description: 'ID da propriedade' })
  @IsDefined()
  @IsString()
  ruralPropertyId: string

  @ApiProperty({ example: 'b5cdc875-89d4-4ae6-a2ce-7baf223ee81b', description: 'ID da safra' })
  @IsDefined()
  @IsString()
  harvestId: string

  @ApiProperty({ example: 'Soja', description: 'Nome da cultura' })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  cropName: string
}