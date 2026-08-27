import { IsOptional, IsString, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProducerInputDTO {
  @ApiPropertyOptional({ example: 'João da Silva' })
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;
}
