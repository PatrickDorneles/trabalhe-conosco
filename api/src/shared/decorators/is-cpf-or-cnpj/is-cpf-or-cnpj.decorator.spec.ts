import { validate as classValidate } from 'class-validator'
import { plainToInstance } from 'class-transformer'
import { IsCpfOrCnpj } from './is-cpf-or-cnpj.decorator'

class TestDTO {
  @IsCpfOrCnpj()
  document: string
}

describe('IsCpfOrCnpj decorator', () => {
  const validate = async (document: string) => {
    const dto = plainToInstance(TestDTO, { document })
    const errors = await classValidate(dto)
    return errors.length === 0
  };

  it.each([
    ['valid CPF', '52998224725'],
    ['valid CNPJ', '11222333000181'],
  ])('should accept %s', async (_label, value) => {
    expect(await validate(value)).toBe(true);
  });

  it.each([
    ['invalid CPF', '52998224726'],
    ['invalid CNPJ', '11222333000182'],
    ['wrong length', '12345'],
    ['empty', ''],
  ])('should reject %s', async (_label, value) => {
    expect(await validate(value)).toBe(false);
  });
});
