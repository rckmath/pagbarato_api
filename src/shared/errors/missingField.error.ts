export class MissingFieldException extends Error {
  public readonly name = 'MissingFieldException';

  constructor(fieldName: string) {
    super('Missing field ' + fieldName);
    Object.freeze(this)
  }
}
