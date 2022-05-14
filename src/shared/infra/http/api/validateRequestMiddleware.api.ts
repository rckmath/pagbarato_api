import { BaseMiddleware } from '.';
import { Request, Response, NextFunction } from 'express';

export default class ValidateRequestMiddleware extends BaseMiddleware {
  constructor(
    private readonly _DtoClass: { from: any },
    private readonly _withParams = false,
    private readonly _withQuery = false
  ) {
    super();
  }

  public execute(req: Request, _: Response, next: NextFunction): void | Promise<void> {
    if (this._withParams) {
      req.body = {
        ...req.body,
        ...req.params,
      };
    }

    if (this._withQuery) {
      req.body = {
        ...req.body,
        ...req.query,
      };
    }

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
}
