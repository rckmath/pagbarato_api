export class MissingFieldError extends Error {
  public readonly name = 'MissingFieldError';

  constructor(fieldName: string) {
    super('Missing field ' + fieldName);
    Object.freeze(this)
  }
}
