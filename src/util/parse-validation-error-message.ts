import { ValidationError } from 'class-validator';

export function parseValidationErrorMessage(errors: ValidationError[]): string {
  let message: string = undefined;

  if (errors.length > 0) {
    const error = errors[0];
    if (error.constraints) {
      message = error.constraints[Object.keys(error.constraints)[0]];
    } else {
      const childrenError = error.children[0];
      message =
        childrenError.constraints[Object.keys(childrenError.constraints)[0]];
    }
  }

  return message;
}
