/* eslint-disable @typescript-eslint/ban-types */
// Ivalidator validate method receives a T object i want to validate and returns an array of string representing the errors.
// If it returns undefined, means we did not encounter any validation error.
export interface IValidator<> {
  validate(obj: object): Promise<string[] | undefined>;
}
