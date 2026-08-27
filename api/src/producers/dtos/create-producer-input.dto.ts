import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsString, MinLength } from "class-validator";
import { IsCpfOrCnpj } from "src/shared/decorators/is-cpf-or-cnpj/is-cpf-or-cnpj.decorator";

export class CreateProducerInputDTO {
  @IsDefined()
  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string

  @IsDefined()
  @IsString()
  @IsCpfOrCnpj()
  @ApiProperty()
  document: string
}
