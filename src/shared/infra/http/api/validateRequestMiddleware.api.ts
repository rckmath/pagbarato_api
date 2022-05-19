import { BaseMiddleware } from '.';
import { Request, Response, NextFunction } from 'express';

export default class ValidateRequestMiddleware extends BaseMiddleware {
  constructor(
    private readonly _DtoClass: { from: any },
    private readonly _withParams = false,
    private readonly _withQuery = false,
    private readonly _withAll = false,
  ) {
    super();
  }

  public execute(req: Request, _: Response, next: NextFunction): void | Promise<void> {
    req.body = {
      ...req.body,
      ...(this._withParams && req.params) || (this._withAll && req.params),
      ...(this._withQuery && req.query) || (this._withAll && req.query),
    };

    req.body = this._DtoClass.from(req.body);

    next();
  }

  static with(dto: any) {
    return new ValidateRequestMiddleware(dto).execute;
  }

  static withParams(dto: any) {
    return new ValidateRequestMiddleware(dto, true).execute;
  }

  static withQuery(dto: any) {
    return new ValidateRequestMiddleware(dto, false, true).execute;
  }

  static withAll(dto: any) {
    return new ValidateRequestMiddleware(dto, false, false, true).execute;
  }
}
