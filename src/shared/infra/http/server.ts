import helmet from 'helmet';
import * as express from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import { Router } from './api';

import { errorHandlerMiddleware } from './api';

import '@user/user.controller';
import '@product/product.controller';
import '@establishment/establishment.controller';

export default class Server {
  private readonly _server: InversifyExpressServer;

  constructor(private readonly _port: number = 3000, private readonly _container: Container) {
    this._server = new InversifyExpressServer(this._container, null, {
      rootPath: '/api',
    });
  }

  private setConfig = (app: express.Application) => {
    app.use(
      express.urlencoded({
        extended: true,
      })
    );
    app.use(express.json());
    app.use(helmet());
    app.use(Router);
  };

  private setErrorConfig = (app: express.Application) => {
    app.use(errorHandlerMiddleware);
  };

  public setup(): void {
    this._server
      .setConfig(this.setConfig)
      .setErrorConfig(this.setErrorConfig)
      .build()
      .listen(this._port, () => {
        console.info(`Server is running on port ${this._port}`);
      });
  }
}
