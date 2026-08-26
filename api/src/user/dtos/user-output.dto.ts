import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class UserOutput {
  @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário' })
  @Expose()
  name: string

  @ApiProperty({ example: 'usuario@email.com', description: 'E-mail do usuário' })
  @Expose()
  email: string
}
