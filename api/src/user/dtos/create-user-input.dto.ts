import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'


export class CreateUserInputDTO {
  @ApiProperty({ example: 'usuario@email.com', description: 'E-mail do usuário' })
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({ example: 'senha123', description: 'Senha do usuário (mínimo 8 caracteres)', minLength: 8 })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string

  @ApiProperty({ example: 'João da Silva', description: 'Nome do usuário (mínimo 3 caracteres)', minLength: 3 })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string
}

