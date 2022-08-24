import * as express from 'express';
import { inject } from 'inversify';
import { controller, request, response, BaseHttpController, Controller, httpGet } from 'inversify-express-utils';

import { TYPES } from '@shared/ioc/types.ioc';

import AuthMiddleware from '@user/user.middleware';

import { IUserService } from '@user/user.interface';
import { IPriceService } from '@price/price.interface';
import { IProductService } from '@product/product.interface';
import { IEstablishmentService } from '@establishment/establishment.interface';

import { DashboardFindManyDto } from './dtos';

import { BaseHttpResponse, Request, Validate } from '@http/api';

@controller('/dashboard')
export class DashboardController extends BaseHttpController implements Controller {
  constructor(
    @inject(TYPES.IUserService) private readonly _userService: IUserService,
    @inject(TYPES.IEstablishmentService) private readonly _establishmentService: IEstablishmentService,
    @inject(TYPES.IProductService) private readonly _productService: IProductService,
    @inject(TYPES.IPriceService) private readonly _priceService: IPriceService
  ) {
    super();
  }

  @httpGet('/count', AuthMiddleware.validateToken(), Validate.withQuery(DashboardFindManyDto))
  public async getCount(@request() req: Request, @response() res: express.Response) {
    const [userCount, establishmentCount, productCount, priceCount] = await Promise.all([
      this._userService.count(req.body),
      this._establishmentService.count(req.body),
      this._productService.count(req.body),
      this._priceService.count(req.body),
    ]);
    const response = BaseHttpResponse.success({ userCount, establishmentCount, productCount, priceCount });
    return res.json(response);
  }
}
