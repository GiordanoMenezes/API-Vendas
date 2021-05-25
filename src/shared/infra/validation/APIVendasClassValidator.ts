/* eslint-disable @typescript-eslint/ban-types */
import { IValidator } from '@shared/validation/IValidator';
import { validate, ValidationError } from 'class-validator';

class APIVendasClassValidator implements IValidator {
  async validate(obj: object): Promise<string[]> {
    const errorMessages: string[] = [];

    function captureErrors(err: ValidationError): void {
      if (err.children && err.children.length > 0) {
        err.children.forEach(child => {
          captureErrors(child);
        });
      }
      if (err.constraints) {
        errorMessages.push(Object.values(err.constraints)[0]);
      }
    }

    const validationErrors: ValidationError[] = await validate(obj);

    validationErrors.forEach(err => {
      captureErrors(err);
    });

    return errorMessages;
  }
}

export default APIVendasClassValidator;
