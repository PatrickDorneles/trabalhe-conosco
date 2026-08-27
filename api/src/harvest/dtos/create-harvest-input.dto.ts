import { ApiProperty } from '@nestjs/swagger'
import { IsInt, Max, Min } from 'class-validator'

export class CreateHarvestInputDTO {
  @ApiProperty({ example: 2024 })
  @IsInt()
  @Min(1900)
  @Max(2100)
  year: number
}
