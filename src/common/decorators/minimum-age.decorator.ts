import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { intervalToDuration } from 'date-fns';

@ValidatorConstraint({ name: 'MinimumAge', async: false })
export class MinimumAgeConstraint implements ValidatorConstraintInterface {
  // FIXME: UTC 기준 날짜로 계산함
  validate(value: Date, args: ValidationArguments) {
    if (value instanceof Date === false) {
      return false;
    }
    const [targetAge] = args.constraints;
    const targetDate = value;

    const { years: age } = intervalToDuration({
      start: targetDate,
      end: new Date(),
    });

    return age >= targetAge;
  }
}

export function MinimumAge(age: number, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'minimumAge',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [age],
      validator: MinimumAgeConstraint,
    });
  };
}
