import * as express from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpPost,
  request,
  response,
  BaseHttpController,
  Controller,
  httpGet,
  httpDelete,
  httpPut,
} from 'inversify-express-utils';

import { TYPES } from '@shared/ioc/types.ioc';

import { IPriceService } from './price.interface';
import { PriceCreateDto, PriceFindOneDto, PriceDeleteDto, PriceFindManyDto, PriceDto, PriceUpdateDto } from './dtos';

import { BaseHttpResponse } from '@http/api';
import { ValidateRequestMiddleware } from '@http/api';
import { BasePaginationDto } from '@shared/infra/http/dto';

@controller('/price')
export class PriceController extends BaseHttpController implements Controller {
  constructor(@inject(TYPES.IPriceService) private readonly _priceService: IPriceService) {
    super();
  }

  @httpPost('/', ValidateRequestMiddleware.with(PriceCreateDto))
  public async create(@request() req: express.Request, @response() res: express.Response) {
    const createdPrice = await this._priceService.createOne(req.body);
    const response = BaseHttpResponse.success(createdPrice);
    return res.json(response);
  }

  @httpGet('/', ValidateRequestMiddleware.withQuery(PriceFindManyDto))
  public async getWithPagination(@request() req: express.Request, @response() res: express.Response) {
    let response;
    const [prices, priceCount] = await Promise.all([
      this._priceService.findMany(req.body),
      req.body.paginate ? this._priceService.count(req.body) : undefined,
    ]);
    response = req.body.paginate ? new BasePaginationDto<PriceDto>(priceCount, parseInt(req.body.page), prices) : prices;
    response = BaseHttpResponse.success(response);
    return res.json(response);
  }

  @httpGet('/:id', ValidateRequestMiddleware.withParams(PriceFindOneDto))
  public async getById(@request() req: express.Request, @response() res: express.Response) {
    const price = await this._priceService.findOne(req.body);
    const response = BaseHttpResponse.success(price);
    return res.json(response);
  }

  @httpPut('/:id', ValidateRequestMiddleware.withParams(PriceUpdateDto))
  public async updateById(@request() req: express.Request, @response() res: express.Response) {
    const price = await this._priceService.updateOne(req.body);
    const response = BaseHttpResponse.success(price);
    return res.json(response);
  }

  @httpDelete('/:id', ValidateRequestMiddleware.withParams(PriceDeleteDto))
  public async deleteById(@request() req: express.Request, @response() res: express.Response) {
    const price = await this._priceService.delete(req.body);
    const response = BaseHttpResponse.success(price);
    return res.json(response);
  }
}
