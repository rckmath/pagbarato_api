export class AuthenticationException extends Error {
  public readonly name = 'AuthenticationException';

  constructor(message = '') {
    super(message);
    Object.freeze(this);
  }
}
