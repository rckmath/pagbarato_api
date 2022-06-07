import { IAuth } from '@user/user.interface';
import { Request as ExpressRequest } from 'express';

export default interface Request extends ExpressRequest {
  auth: IAuth;
}
