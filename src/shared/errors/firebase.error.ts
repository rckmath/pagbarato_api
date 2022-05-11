export class FirebaseIntegrationException extends Error {
  public readonly name = 'FirebaseIntegrationException';
  public readonly code;

  constructor(baseError: any) {
    const error = baseError.errorInfo || baseError;
    super(error.message);
    this.code = error.code || 500;
    Object.freeze(this);
  }
}
