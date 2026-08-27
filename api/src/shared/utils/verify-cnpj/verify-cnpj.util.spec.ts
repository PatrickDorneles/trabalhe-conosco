import { VerifyCNPJ } from './verify-cnpj.util';

describe('VerifyCNPJ', () => {
  const verifier = new VerifyCNPJ();

  describe('valid CNPJs', () => {
    it.each([
      '11222333000181',
      '11444777000161',
      '40876523000110',
      '51345678000147',
    ])('should accept %s', (cnpj) => {
      expect(verifier.execute(cnpj)).toBe(true);
    });
  });

  describe('invalid CNPJs', () => {
    it.each([
      ['wrong check digits', '11222333000182'],
      ['all same digits', '11111111111111'],
      ['all same digits (0)', '00000000000000'],
      ['all same digits (9)', '99999999999999'],
      ['too short', '1122233300018'],
      ['too long', '112223330001810'],
      ['empty string', ''],
    ])('should reject %s: %s', (_label, cnpj) => {
      expect(verifier.execute(cnpj)).toBe(false);
    });
  });
});
