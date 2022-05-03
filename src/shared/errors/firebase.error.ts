export class FirebaseIntegrationException extends Error {
  public readonly name = 'FirebaseIntegrationException';
  public readonly code;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    Object.freeze(this);
  }
}
