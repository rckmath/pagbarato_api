export class NotFoundError extends Error {
  public readonly name = 'NotFoundError';

  constructor(message: string) {
    super(message);
    Object.freeze(this)
  }
}
