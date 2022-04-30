export class InvalidFieldError extends Error {
  public readonly name = 'InvalidFieldError';

  constructor(fieldName: string, fieldValue?: string) {
    super('Invalid ' + fieldName + (fieldValue ? `: ${fieldValue}.` : '.'));
    Object.freeze(this)
  }
}
