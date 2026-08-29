import { PropertyInvalidAreaException } from '@/rural-property/errors/property-invalid-area.exception';
import { PropertyAreaValidator } from './property-area.validator';

describe('PropertyAreaValidator', () => {
  const validator = new PropertyAreaValidator();

  describe('execute', () => {
    it('should accept totalArea equal to the sum of arable + vegetation', () => {
      expect(() =>
        validator.execute({ totalArea: 1000, arableArea: 800, vegetationArea: 200 }),
      ).not.toThrow();
    });

    it('should accept totalArea greater than the sum of arable + vegetation', () => {
      expect(() =>
        validator.execute({ totalArea: 1200.5, arableArea: 800.25, vegetationArea: 200.5 }),
      ).not.toThrow();
    });

    it('should throw PropertyInvalidAreaException when totalArea is smaller than the sum', () => {
      expect(() =>
        validator.execute({ totalArea: 900, arableArea: 800, vegetationArea: 200 }),
      ).toThrow(PropertyInvalidAreaException);
    });
  });
});
