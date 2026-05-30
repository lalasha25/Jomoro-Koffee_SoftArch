import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsAtLeastThreeWords(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAtLeastThreeWords',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          const words = value.trim().split(/\s+/);
          return words.length >= 3;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must contain at least 3 words`;
        },
      },
    });
  };
}
