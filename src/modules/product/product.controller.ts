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

import { IProductService } from './product.interface';
import { ProductCreateDto, ProductFindOneDto, ProductDeleteDto, ProductFindManyDto, ProductDto, ProductUpdateDto } from './dtos';

import { BaseHttpResponse } from '@http/api';
import { Validate } from '@http/api';
import { BasePaginationDto } from '@shared/infra/http/dto';
import AuthMiddleware from '@user/user.middleware';

@controller('/product')
export class ProductController extends BaseHttpController implements Controller {
  constructor(@inject(TYPES.IProductService) private readonly _productService: IProductService) {
    super();
  }

  @httpPost('/', AuthMiddleware.validateToken(), Validate.with(ProductCreateDto))
  public async create(@request() req: express.Request, @response() res: express.Response) {
    const createdProduct = await this._productService.createOne(req.body);
    const response = BaseHttpResponse.success(createdProduct);
    return res.json(response);
  }

  @httpGet('/', AuthMiddleware.validateToken(), Validate.withQuery(ProductFindManyDto))
  public async getWithPagination(@request() req: express.Request, @response() res: express.Response) {
    let response;
    const [products, productCount] = await Promise.all([
      this._productService.findMany(req.body),
      req.body.paginate ? this._productService.count(req.body) : undefined,
    ]);
    response = req.body.paginate ? new BasePaginationDto<ProductDto>(productCount, parseInt(req.body.page), products) : products;
    response = BaseHttpResponse.success(response);
    return res.json(response);
  }

  @httpGet('/:id', AuthMiddleware.validateToken(), Validate.withAll(ProductFindOneDto))
  public async getById(@request() req: express.Request, @response() res: express.Response) {
    const product = await this._productService.findOne(req.body);
    const response = BaseHttpResponse.success(product);
    return res.json(response);
  }

  @httpPut('/:id', AuthMiddleware.validateToken(), Validate.withParams(ProductUpdateDto))
  public async updateById(@request() req: express.Request, @response() res: express.Response) {
    const product = await this._productService.updateOne(req.body);
    const response = BaseHttpResponse.success(product);
    return res.json(response);
  }

  @httpDelete('/:id', AuthMiddleware.validateToken(), Validate.withParams(ProductDeleteDto))
  public async deleteById(@request() req: express.Request, @response() res: express.Response) {
    const product = await this._productService.delete(req.body);
    const response = BaseHttpResponse.success(product);
    return res.json(response);
  }
}
