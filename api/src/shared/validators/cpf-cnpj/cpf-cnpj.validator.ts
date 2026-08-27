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

    const clean = value.replace(/\D/g, '')

    if (clean.length === 11) {
      return VerifyCPF.instance.execute(clean)
    }

    if (clean.length === 14) {
      return VerifyCNPJ.instance.execute(clean)
    }

    return false
  }

  defaultMessage(validationArguments?: ValidationArguments) {
    return `${validationArguments?.property} must be a valid cpf or cnpj`
  }
}
