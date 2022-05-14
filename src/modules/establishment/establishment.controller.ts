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

import { IEstablishmentService } from './establishment.interface';
import {
  EstablishmentCreateDto,
  EstablishmentFindOneDto,
  EstablishmentDeleteDto,
  EstablishmentFindManyDto,
  EstablishmentDto,
  EstablishmentUpdateDto,
} from './dtos';

import { BaseHttpResponse } from '@http/api';
import { ValidateRequestMiddleware } from '@http/api';
import { BasePaginationDto } from '@shared/infra/http/dto';

@controller('/establishment')
export class EstablishmentController extends BaseHttpController implements Controller {
  constructor(@inject(TYPES.IEstablishmentService) private readonly _establishmentService: IEstablishmentService) {
    super();
  }

  @httpPost('/', ValidateRequestMiddleware.with(EstablishmentCreateDto))
  public async create(@request() req: express.Request, @response() res: express.Response) {
    const createdEstablishment = await this._establishmentService.createOne(req.body);
    const response = BaseHttpResponse.success(createdEstablishment);
    return res.json(response);
  }

  @httpGet('/', ValidateRequestMiddleware.withQuery(EstablishmentFindManyDto))
  public async getWithPagination(@request() req: express.Request, @response() res: express.Response) {
    let response;

    const [establishments, establishmentCount] = await Promise.all([
      this._establishmentService.findMany(req.body),
      this._establishmentService.count(req.body),
    ]);

    response = new BasePaginationDto<EstablishmentDto>(establishmentCount, parseInt(req.body.page), establishments);
    response = BaseHttpResponse.success(response);

    return res.json(response);
  }

  @httpGet('/:id', ValidateRequestMiddleware.withParams(EstablishmentFindOneDto))
  public async getById(@request() req: express.Request, @response() res: express.Response) {
    const establishment = await this._establishmentService.findOne(req.body);
    const response = BaseHttpResponse.success(establishment);
    return res.json(response);
  }

  @httpPut('/:id', ValidateRequestMiddleware.withParams(EstablishmentUpdateDto))
  public async updateById(@request() req: express.Request, @response() res: express.Response) {
    const establishment = await this._establishmentService.updateOne(req.body);
    const response = BaseHttpResponse.success(establishment);
    return res.json(response);
  }

  @httpDelete('/:id', ValidateRequestMiddleware.withParams(EstablishmentDeleteDto))
  public async deleteById(@request() req: express.Request, @response() res: express.Response) {
    const establishment = await this._establishmentService.delete(req.body);
    const response = BaseHttpResponse.success(establishment);
    return res.json(response);
  }
}