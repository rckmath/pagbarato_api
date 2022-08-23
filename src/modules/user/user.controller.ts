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

import AuthMiddleware from './user.middleware';

import { IUserService } from './user.interface';
import { UserCreateDto, UserFindOneDto, UserDeleteDto, UserFindManyDto, UserDto, UserUpdateDto } from './dtos';

import { BaseHttpResponse, Request, Validate } from '@http/api';
import { BasePaginationDto } from '@http/dto';

@controller('/user')
export class UserController extends BaseHttpController implements Controller {
  constructor(@inject(TYPES.IUserService) private readonly _userService: IUserService) {
    super();
  }

  @httpPost('/', Validate.with(UserCreateDto))
  public async create(@request() req: Request, @response() res: express.Response) {
    const createdUser = await this._userService.createOne(req.body);
    const response = BaseHttpResponse.success(createdUser);
    return res.json(response);
  }

  @httpGet('/', AuthMiddleware.validateToken(), Validate.withQuery(UserFindManyDto))
  public async getWithPagination(@request() req: Request, @response() res: express.Response) {
    let response;
    const [users, userCount] = await Promise.all([
      this._userService.findMany(req.body),
      req.body.paginate ? this._userService.count(req.body) : undefined,
    ]);
    response = req.body.paginate ? new BasePaginationDto<UserDto>(userCount, parseInt(req.body.page), users) : users;
    response = BaseHttpResponse.success(response);
    return res.json(response);
  }

  @httpGet('/:id', AuthMiddleware.validateToken(), Validate.withAll(UserFindOneDto))
  public async getById(@request() req: Request, @response() res: express.Response) {
    const user = await this._userService.findOne(req.body);
    const response = BaseHttpResponse.success(user);
    return res.json(response);
  }

  @httpPut('/:id', AuthMiddleware.validateToken(), Validate.withParams(UserUpdateDto))
  public async updateById(@request() req: Request, @response() res: express.Response) {
    const user = await this._userService.updateOne(req.body);
    const response = BaseHttpResponse.success(user);
    return res.json(response);
  }

  @httpDelete('/:id', AuthMiddleware.validateToken(), Validate.withParams(UserDeleteDto))
  public async deleteById(@request() req: Request, @response() res: express.Response) {
    const user = await this._userService.delete(req.body);
    const response = BaseHttpResponse.success(user);
    return res.json(response);
  }
}
