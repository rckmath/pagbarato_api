import * as path from 'path';
import moduleAlias from 'module-alias';

const files = path.resolve(__dirname, '../../..');

moduleAlias.addAliases({
  '@root': path.join(files, '.'),
  '@src': path.join(files, 'src'),
  '@test': path.join(files, 'test'),
  '@shared': path.join(files, 'src/shared'),
  '@configs': path.join(files, 'src/configs'),
  '@modules': path.join(files, 'src/modules'),
  '@user': path.join(files, 'src/modules/user'),
  '@infra': path.join(files, 'src/shared/infra'),
  '@utils': path.join(files, 'src/shared/utils'),
  '@http': path.join(files, 'src/shared/infra/http'),
  '@database': path.join(files, 'src/shared/infra/database'),
});
