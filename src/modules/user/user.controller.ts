import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpPost, request, response, BaseHttpController, Controller } from 'inversify-express-utils';

import { TYPES } from '@shared/ioc/types.ioc';

import { IUserService } from './user.interface';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dtos';

import { BaseHttpResponse } from '@http/api';
import { ValidateRequestMiddleware } from '@http/api';

@controller('/user')
export class UserController extends BaseHttpController implements Controller {
  constructor(@inject(TYPES.IUserService) private readonly _userService: IUserService<UserEntity>) {
    super();
  }

  @httpPost('/', ValidateRequestMiddleware.with(CreateUserDto))
  public async create(@request() req: express.Request, @response() res: express.Response) {
    const createdUser = await this._userService.createOne(req.body);

    const response = BaseHttpResponse.success(createdUser);

    return res.json(response);
  }
}
