export class VerifyCPF {
  static instance = new VerifyCPF()

  private readonly CPF_LENGTH = 11
  private readonly CHECK_DIGITS = 2
  private readonly DIGITS_REGEX = /\D/g

  constructor() {
    return VerifyCPF.instance
  }

  execute(cpf: string) {
    // get only the digits from the string, just an additional guard rail
    const digits = cpf.replace(this.DIGITS_REGEX, '');

    if (cpf.length !== this.CPF_LENGTH || digits === digits.at(0)!.repeat(this.CPF_LENGTH)) {
      return false
    }

    let sum = 0
    for (let i = 0; i < this.CPF_LENGTH - this.CHECK_DIGITS; i++) {
      sum += parseInt(digits.at(i)!) * (this.CPF_LENGTH - 1 - i)
    }
    let remainder = sum % this.CPF_LENGTH
    const firstCheckDigit = remainder < 2 ? 0 : this.CPF_LENGTH - remainder

    if (parseInt(digits.at(9)!) !== firstCheckDigit) {
      return false
    }

    sum = 0
    for (let i = 0; i < this.CPF_LENGTH - this.CHECK_DIGITS + 1; i++) {
      sum += parseInt(digits.at(i)!) * (this.CPF_LENGTH - i)
    }
    remainder = sum % this.CPF_LENGTH
    const secondCheckDigit = remainder < 2 ? 0 : this.CPF_LENGTH - remainder

    return parseInt(digits.at(10)!) === secondCheckDigit
  }
}


