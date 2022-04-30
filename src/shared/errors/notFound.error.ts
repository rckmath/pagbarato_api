export class NotFoundException extends Error {
  public readonly name = 'NotFoundException';

  constructor(message: string) {
    super(message);
    Object.freeze(this)
  }
}
