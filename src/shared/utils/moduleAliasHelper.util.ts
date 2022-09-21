import * as path from 'path';
import moduleAlias from 'module-alias';

import Constants from '../../configs/constants.config';

const files = path.resolve(__dirname, '../../..');
const prefix = Constants.env?.trim() == 'production' ? 'dist' : 'src';

moduleAlias.addAliases({
  '@root': path.join(files, '.'),
  '@shared': path.join(files, `${prefix}/shared`),
  '@configs': path.join(files, `${prefix}/configs`),
  '@modules': path.join(files, `${prefix}/modules`),
  '@user': path.join(files, `${prefix}/modules/user`),
  '@infra': path.join(files, `${prefix}/shared/infra`),
  '@utils': path.join(files, `${prefix}/shared/utils`),
  '@price': path.join(files, `${prefix}/modules/price`),
  '@http': path.join(files, `${prefix}/shared/infra/http`),
  '@product': path.join(files, `${prefix}/modules/product`),
  '@dashboard': path.join(files, `${prefix}/modules/dashboard`),
  '@database': path.join(files, `${prefix}/shared/infra/database`),
  '@establishment': path.join(files, `${prefix}/modules/establishment`),
  '@business_hours': path.join(files, `${prefix}/modules/business_hours`),
});
