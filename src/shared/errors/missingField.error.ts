export class MissingFieldException extends Error {
  public readonly name = 'MissingFieldError';

  constructor(fieldName: string) {
    super('Missing field ' + fieldName);
    Object.freeze(this)
  }
}
