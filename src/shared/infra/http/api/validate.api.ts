import { BaseMiddleware } from '.';
import { Request, Response, NextFunction } from 'express';

export default class Validate extends BaseMiddleware {
  constructor(
    private readonly _DtoClass: { from: any },
    private readonly _withParams = false,
    private readonly _withQuery = false
  ) {
    super();
  }

  public execute(req: Request, _: Response, next: NextFunction): void | Promise<void> {
    req.body = {
      ...req.body,
      ...(this._withParams && req.params),
      ...(this._withQuery && req.query),
    };

    req.body = this._DtoClass.from(req.body);

    next();
  }

  static with(dto: any) {
    return new Validate(dto).execute;
  }

  static withParams(dto: any) {
    return new Validate(dto, true).execute;
  }

  static withQuery(dto: any) {
    return new Validate(dto, false, true).execute;
  }
}
