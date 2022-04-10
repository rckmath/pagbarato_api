import helmet from 'helmet';
import express, { NextFunction, Request, Response } from 'express';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

import routes from './api/public';

import '@user/user.controller';

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
    app.use(routes);
  };

  private setErrorConfig = (app: express.Application) => {
    app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    });
  };

  public setup(): void {
    this._server.setConfig(this.setConfig);
    this._server.setErrorConfig(this.setErrorConfig);
    this._server.build().listen(this._port, () => {
      console.info(`Server is running on port ${this._port}`);
    });
  }
}
