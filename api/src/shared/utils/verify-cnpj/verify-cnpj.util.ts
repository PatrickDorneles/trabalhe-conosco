export class VerifyCNPJ {
  static instance = new VerifyCNPJ()

  private readonly CNPJ_LENGTH = 14
  private readonly DIGITS_REGEX = /\D/g

  private readonly FIRST_WEIGHTS = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  private readonly SECOND_WEIGHTS = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

  constructor() {
    return VerifyCNPJ.instance
  }

  execute(cnpj: string) {
    const digits = cnpj.replace(this.DIGITS_REGEX, '');

    if (
      cnpj.length !== this.CNPJ_LENGTH ||
      digits === digits.at(0)!.repeat(this.CNPJ_LENGTH)
    ) {
      return false
    }

    let sum = 0
    for (let i = 0; i < this.FIRST_WEIGHTS.length; i++) {
      sum += parseInt(digits.at(i)!) * this.FIRST_WEIGHTS[i]
    }
    let remainder = sum % 11
    const firstCheckDigit = remainder < 2 ? 0 : 11 - remainder

    if (parseInt(digits.at(12)!) !== firstCheckDigit) {
      return false
    }

    sum = 0
    for (let i = 0; i < this.SECOND_WEIGHTS.length; i++) {
      sum += parseInt(digits.at(i)!) * this.SECOND_WEIGHTS[i]
    }
    remainder = sum % 11
    const secondCheckDigit = remainder < 2 ? 0 : 11 - remainder

    return parseInt(digits.at(13)!) === secondCheckDigit
  }
}
