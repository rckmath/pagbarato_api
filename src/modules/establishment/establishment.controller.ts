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

import { BaseHttpResponse, Request, Validate } from '@http/api';
import { BasePaginationDto } from '@http/dto';
import AuthMiddleware from '@user/user.middleware';

@controller('/establishment')
export class EstablishmentController extends BaseHttpController implements Controller {
  constructor(@inject(TYPES.IEstablishmentService) private readonly _establishmentService: IEstablishmentService) {
    super();
  }

  @httpPost('/', AuthMiddleware.validateToken(), Validate.with(EstablishmentCreateDto))
  public async create(@request() req: Request, @response() res: express.Response) {
    const createdEstablishment = await this._establishmentService.createOne(req.body);
    const response = BaseHttpResponse.success(createdEstablishment);
    return res.json(response);
  }

  @httpGet('/', AuthMiddleware.validateToken(), Validate.withQuery(EstablishmentFindManyDto))
  public async getWithPagination(@request() req: Request, @response() res: express.Response) {
    let response;
    const [establishments, establishmentCount] = await Promise.all([
      this._establishmentService.findMany(req.body),
      req.body.paginate ? this._establishmentService.count(req.body) : undefined,
    ]);
    response = req.body.paginate
      ? new BasePaginationDto<EstablishmentDto>(establishmentCount, parseInt(req.body.page), establishments)
      : establishments;
    response = BaseHttpResponse.success(response);

    return res.json(response);
  }

  @httpGet('/:id', AuthMiddleware.validateToken(), Validate.withParams(EstablishmentFindOneDto))
  public async getById(@request() req: Request, @response() res: express.Response) {
    const establishment = await this._establishmentService.findOne(req.body);
    const response = BaseHttpResponse.success(establishment);
    return res.json(response);
  }

  @httpPut('/:id', AuthMiddleware.validateToken(), Validate.withParams(EstablishmentUpdateDto))
  public async updateById(@request() req: Request, @response() res: express.Response) {
    const establishment = await this._establishmentService.updateOne(req.body);
    const response = BaseHttpResponse.success(establishment);
    return res.json(response);
  }

  @httpDelete('/:id', AuthMiddleware.validateToken(), Validate.withAll(EstablishmentDeleteDto))
  public async deleteById(@request() req: Request, @response() res: express.Response) {
    const establishment = await this._establishmentService.delete(req.body);
    const response = BaseHttpResponse.success(establishment);
    return res.json(response);
  }
}
