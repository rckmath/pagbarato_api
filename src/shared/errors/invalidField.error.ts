export class InvalidFieldException extends Error {
  public readonly name = 'InvalidFieldException';

  constructor(fieldName: string, fieldValue?: string | number) {
    super('Invalid ' + fieldName + (fieldValue ? `: ${fieldValue}.` : '.'));
    Object.freeze(this);
  }
}
