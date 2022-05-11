import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpPost, request, response, BaseHttpController, Controller, httpGet } from 'inversify-express-utils';

import { TYPES } from '@shared/ioc/types.ioc';

import { IUserService } from './user.interface';
import { UserCreateDto, UserDto, UserFindOneDto } from './dtos';

import { BaseHttpResponse } from '@http/api';
import { ValidateRequestMiddleware } from '@http/api';

@controller('/user')
export class UserController extends BaseHttpController implements Controller {
  constructor(@inject(TYPES.IUserService) private readonly _userService: IUserService<UserDto>) {
    super();
  }

  @httpPost('/', ValidateRequestMiddleware.with(UserCreateDto))
  public async create(@request() req: express.Request, @response() res: express.Response) {
    const createdUser = await this._userService.createOne(req.body);

    const response = BaseHttpResponse.success(createdUser);

    return res.json(response);
  }

  @httpGet('/:id', ValidateRequestMiddleware.withParams(UserFindOneDto))
  public async getById(@request() req: express.Request, @response() res: express.Response) {
    const user = await this._userService.findOne(req.body);

    const response = BaseHttpResponse.success(user);

    return res.json(response);
  }
}
