import { VerifyCPF } from './verify-cpf.util';

describe('VerifyCPF', () => {
  const verifier = new VerifyCPF();

  describe('valid CPFs', () => {
    it.each([
      '52998224725',
      '12345678909',
      '98765432100',
      '45678901249',
      '10203040570',
    ])('should accept %s', (cpf) => {
      expect(verifier.execute(cpf)).toBe(true);
    });
  });

  describe('invalid CPFs', () => {
    it.each([
      ['wrong check digits', '52998224726'],
      ['all same digits', '11111111111'],
      ['all same digits (0)', '00000000000'],
      ['all same digits (9)', '99999999999'],
      ['too short', '1234567890'],
      ['too long', '123456789012'],
      ['empty string', ''],
    ])('should reject %s: %s', (_label, cpf) => {
      expect(verifier.execute(cpf)).toBe(false);
    });
  });
});
