import { InvalidFieldError, MissingFieldError } from '@shared/errors';
import * as express from 'express';
import BaseHttpResponse from './baseResponse.api';

type Error = {
  name: string | null,
  message: string | null,
};


export default function errorHandlerMiddleware(err: any, _req: express.Request, res: express.Response, next: express.NextFunction) {
  const errorObject: Error = {
    name: err?.name,
    message: err?.message,
  };

  if (err instanceof InvalidFieldError || err?.name === 'InvalidFieldError') {
    const response = BaseHttpResponse.failed(errorObject, 400)
    return res.status(response.statusCode).json(response)
  }

  if (err instanceof MissingFieldError || err?.name === 'MissingFieldError') {
    const response = BaseHttpResponse.failed(errorObject, 422)
    return res.status(response.statusCode).json(response)
  }

  if (err instanceof Error) {
    const response = BaseHttpResponse.failed(errorObject, 500)
    return res.status(response.statusCode).json(response)
  }

  return next();
}
