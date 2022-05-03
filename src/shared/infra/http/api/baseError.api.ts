import { FirebaseIntegrationException, InvalidFieldException, MissingFieldException, NotFoundException } from '@shared/errors';
import * as express from 'express';
import BaseHttpResponse from './baseResponse.api';

type Error = {
  name: string | null;
  message: string | null;
  code: string | null;
};

export default function errorHandlerMiddleware(
  err: any,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const errorObject: Error = {
    name: err?.name,
    message: err?.message,
    code: err?.code,
  };

  if (err instanceof InvalidFieldException || err?.name === 'InvalidFieldException') {
    const response = BaseHttpResponse.failed(errorObject, 400);
    return res.status(response.statusCode).json(response);
  }

  if (err instanceof FirebaseIntegrationException || err?.name === 'FirebaseIntegrationException') {
    const response = BaseHttpResponse.failed(errorObject, 400);
    return res.status(response.statusCode).json(response);
  }

  if (err instanceof MissingFieldException || err?.name === 'MissingFieldException') {
    const response = BaseHttpResponse.failed(errorObject, 422);
    return res.status(response.statusCode).json(response);
  }

  if (err instanceof NotFoundException || err?.name === 'NotFoundException') {
    const response = BaseHttpResponse.failed(errorObject, 404);
    return res.status(response.statusCode).json(response);
  }

  if (err instanceof Error) {
    const response = BaseHttpResponse.failed(errorObject, 500);
    return res.status(response.statusCode).json(response);
  }

  return next();
}
