import * as express from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpPost,
  request,
  response,
  BaseHttpController,
  IHttpActionResult,
  Controller,
} from 'inversify-express-utils';

import { TYPES } from '@shared/ioc/types.ioc';

import { IUserService } from './user.interface';
import { UserEntity } from './user.entity';

@controller('/user')
export class UserController extends BaseHttpController implements Controller {
  constructor(@inject(TYPES.IUserService) private readonly _userService: IUserService<UserEntity>) {
    super();
  }

  @httpPost('/')
  public async create(@request() req: express.Request, @response() _res: express.Response): Promise<IHttpActionResult> {
    try {
      let response = {};

      response = await this._userService.createOne(req.body);

      return this.json(response, 201);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return this.json({ error: err.message }, 400);
    }
  }
}
