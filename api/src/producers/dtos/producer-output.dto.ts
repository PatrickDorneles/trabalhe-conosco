import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class ProducerOutput {
  @ApiProperty({ example: 'João da Silva', description: 'Nome do produtor' })
  @Expose()
  name: string

  @ApiProperty({ example: '12345678909', description: 'CPF ou CNPJ do produtor' })
  @Expose()
  document: string
}
