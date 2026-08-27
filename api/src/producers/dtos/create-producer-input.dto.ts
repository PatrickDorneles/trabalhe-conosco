import { IsDefined, IsOptional, IsString, Length, MinLength } from "class-validator";
import { IsCpfOrCnpj } from "src/shared/decorators/is-cpf-or-cnpj/is-cpf-or-cnpj.decorator";

export class CreateProducerInputDTO {
  @IsDefined()
  @IsString()
  @MinLength(3)
  name: string

  @IsDefined()
  @IsString()
  @IsCpfOrCnpj()
  document: string





}
