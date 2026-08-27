import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { VerifyCPF } from '../../utils/verify-cpf/verify-cpf.util'
import { VerifyCNPJ } from '../../utils/verify-cnpj/verify-cnpj.util'

@ValidatorConstraint({ name: 'cpfCnpj', async: false })
export class CpfCnpjValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    if (!value) return false

    value = value.replace(/\D/g, '')

    if (value.length === 11) {
      return VerifyCPF.instance.execute(value)
    }

    if (value.length === 14) {
      return VerifyCNPJ.instance.execute(value)
    }

    return false
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return `${validationArguments?.property} must be a valid cpf or cnpj`
  }
}
