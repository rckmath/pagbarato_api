import { inject } from 'inversify';
import { Request, Response, NextFunction } from 'express';

import { BaseMiddleware } from '@http/api';
import FirebaseClient from '@infra/firebase';
import { AuthenticationException } from '@shared/errors';

import { IUserService, IAuth } from './user.interface';
import { TYPES } from '@shared/ioc/types.ioc';
import { container } from '@shared/ioc';

const extractToken = (authorization: string) => {
  let token: string | null = null;
  if (authorization.startsWith('Bearer ')) token = authorization.substring(7, authorization.length);
  return token;
};

export default class AuthMiddleware extends BaseMiddleware {
  constructor(@inject(TYPES.IUserService) private readonly _userService: IUserService) {
    super();
  }

  public async execute(req: Request, _: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.headers.authorization) throw new AuthenticationException('Missing authorization token');
      const token = extractToken(req.headers.authorization);
      if (!token) throw new AuthenticationException('Invalid token');

      try {
        const decodedToken = await FirebaseClient.auth().verifyIdToken(token, true);

        const user = await this._userService.findOne({ firebaseId: decodedToken.uid });

        const auth: IAuth = {
          firebaseToken: token,
          firebaseId: decodedToken.uid,
          userId: user.id,
          role: user.role,
        }

        req.body.auth = auth;
      } catch (err: any) {
        throw new AuthenticationException(err.message);
      }

      next();
    } catch (err) {
      next(err);
    }
  }

  static validateToken() {
    const userService: IUserService = container.get(TYPES.IUserService)
    return new AuthMiddleware(userService).execute;
  }
}