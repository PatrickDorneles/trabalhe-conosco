import { CpfCnpjValidator } from './cpf-cnpj.validator';

describe('CpfCnpjValidator', () => {
  const validator = new CpfCnpjValidator();

  describe('valid documents', () => {
    it.each([
      ['valid CPF', '52998224725'],
      ['valid CPF 2', '12345678909'],
      ['valid CNPJ', '11222333000181'],
      ['valid CNPJ 2', '11444777000161'],
    ])('should accept %s: %s', (_label, value) => {
      expect(validator.validate(value)).toBe(true);
    });
  });

  describe('invalid documents', () => {
    it.each([
      ['invalid CPF', '52998224726'],
      ['invalid CNPJ', '11222333000182'],
      ['all same digits (CPF)', '11111111111'],
      ['all same digits (CNPJ)', '11111111111111'],
      ['wrong length', '12345'],
      ['empty string', ''],
    ])('should reject %s: %s', (_label, value) => {
      expect(validator.validate(value)).toBe(false);
    });
  });

  describe('defaultMessage', () => {
    it('should return error message', () => {
      expect(validator.defaultMessage({ targetName: 'document' } as any)).toBe(
        'document must be a valid cpf or cnpj',
      );
    });
  });
});
