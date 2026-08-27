import { registerDecorator, ValidationOptions } from 'class-validator'
import { CpfCnpjValidator } from '../../validators/cpf-cnpj/cpf-cnpj.validator'

export function IsCpfOrCnpj(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCpfOrCnpj',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: CpfCnpjValidator,
    })
  }
}
