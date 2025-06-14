import {
  Validate,
  ValidateIf,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

type ClassConstructor = { new (...args: any[]): unknown };

@ValidatorConstraint({ name: 'IsTotalAreaValid', async: false })
class IsTotalAreaValidConstraint implements ValidatorConstraintInterface {
  validate(obj: any): boolean {
    if (
      typeof obj.totalArea !== 'number' ||
      typeof obj.farmableArea !== 'number' ||
      typeof obj.greenArea !== 'number'
    ) {
      return true;
    }

    return obj.totalArea <= obj.farmableArea + obj.greenArea;
  }

  defaultMessage(): string {
    return 'A area total precisa ser menor ou igual a soma das areas de cultivo e de vegetação';
  }
}

export function IsTotalAreaValid() {
  return function (constructor: ClassConstructor) {
    const prop = '__totalAreaValidation';
    Object.defineProperty(constructor.prototype, prop, {
      enumerable: false,
      writable: true,
      configurable: true,
    });

    Validate(IsTotalAreaValidConstraint)(constructor.prototype, prop);
    ValidateIf(() => false)(constructor.prototype, prop);
  };
}
