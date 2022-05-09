export class NotFoundException extends Error {
  public readonly name = 'NotFoundException';

  constructor(content = 'Content') {
    super(`${content} not found!`);
    Object.freeze(this);
  }
}
