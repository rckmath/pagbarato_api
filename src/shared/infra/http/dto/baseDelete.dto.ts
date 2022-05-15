import { InvalidFieldException, MissingFieldException } from '@shared/errors';
import { isValidUUID } from '@shared/utils';

export default class BaseDeleteDto {
  constructor(public readonly id: string | Array<string>) {}

  static from(body: Partial<BaseDeleteDto>) {
    let id: Array<string> = [];
    if (!body.id) throw new MissingFieldException('id');
    if (typeof body.id == 'string') id = body.id.split(',');
    if (!id.length) throw new MissingFieldException('id');
    id.forEach((x) => {
      if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
    });
    return new BaseDeleteDto(id);
  }
}
