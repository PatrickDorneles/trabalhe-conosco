import { ApiProperty } from '@nestjs/swagger'

export class SigninOutputDTO {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', description: 'Token de acesso' })
  accessToken: string
}
