import 'reflect-metadata';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

import Constants from './configs/constants.config';

import './shared/utils/moduleAliasHelper.util';
import './shared/infra/firebase';

import Server from './shared/infra/http/server';
import { isDefined } from './shared/utils/validationFunctions.util';
import { container } from './shared/ioc/index';

//#region Constants
const DEFAULT_PORT = 3000;
const port: number = isDefined(Constants.port) ? parseInt(Constants.port) : DEFAULT_PORT;
//#endregion

(async () => {
  new Server(port, container).setup();
})();
