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

import { IUserService } from './user.interface';
import { UserCreateDto, UserFindOneDto, UserDeleteDto, UserFindManyDto, UserDto, UserUpdateDto } from './dtos';

import { BaseHttpResponse, Validate } from '@http/api';
import { BasePaginationDto } from '@http/dto';
import AuthMiddleware from './user.middleware';

@controller('/user')
export class UserController extends BaseHttpController implements Controller {
  constructor(@inject(TYPES.IUserService) private readonly _userService: IUserService) {
    super();
  }

  @httpPost('/', Validate.with(UserCreateDto))
  public async create(@request() req: express.Request, @response() res: express.Response) {
    const createdUser = await this._userService.createOne(req.body);
    const response = BaseHttpResponse.success(createdUser);
    return res.json(response);
  }

  @httpGet('/', AuthMiddleware.validateToken(), Validate.withQuery(UserFindManyDto))
  public async getWithPagination(@request() req: express.Request, @response() res: express.Response) {
    let response;
    const [users, userCount] = await Promise.all([this._userService.findMany(req.body), this._userService.count(req.body)]);
    response = new BasePaginationDto<UserDto>(userCount, parseInt(req.body.page), users);
    response = BaseHttpResponse.success(response);
    return res.json(response);
  }

  @httpGet('/:id', AuthMiddleware.validateToken(), Validate.withAll(UserFindOneDto))
  public async getById(@request() req: express.Request, @response() res: express.Response) {
    const user = await this._userService.findOne(req.body);
    const response = BaseHttpResponse.success(user);
    return res.json(response);
  }

  @httpPut('/:id', AuthMiddleware.validateToken(), Validate.withParams(UserUpdateDto))
  public async updateById(@request() req: express.Request, @response() res: express.Response) {
    const user = await this._userService.updateOne(req.body);
    const response = BaseHttpResponse.success(user);
    return res.json(response);
  }

  @httpDelete('/:id', AuthMiddleware.validateToken(), Validate.withParams(UserDeleteDto))
  public async deleteById(@request() req: express.Request, @response() res: express.Response) {
    const user = await this._userService.delete(req.body);
    const response = BaseHttpResponse.success(user);
    return res.json(response);
  }
}
