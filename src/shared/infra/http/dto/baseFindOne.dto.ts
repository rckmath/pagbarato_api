import { InvalidFieldException, MissingFieldException } from '@shared/errors';
import { isValidUUID } from '@shared/utils';

export default class BaseFindOneDto {
  constructor(public readonly id: string) {}

  static from(body: Partial<BaseFindOneDto>) {
    if (!body.id) throw new MissingFieldException('id');
    if (body.id && !isValidUUID(body.id)) throw new InvalidFieldException('id', body.id);
    return new BaseFindOneDto(body.id);
  }
}
