import { BaseDeleteDto } from '@http/dto';
import { InvalidFieldException, MissingFieldException } from '@shared/errors';
import { isValidUUID } from '@shared/utils';
export default class PriceDeleteDto extends BaseDeleteDto {
  constructor(public readonly id: string | Array<string>, public isRate: boolean = false) {
    super(id);
  }

  static from(body: Partial<PriceDeleteDto>) {
    let id: Array<string> = [];

    if (!body.id) throw new MissingFieldException('id');
    if (typeof body.id == 'string') id = body.id.split(',');
    if (!id.length) throw new MissingFieldException('id');
    id.forEach((x) => {
      if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
    });

    body.isRate = body.isRate && typeof body.isRate == 'string' && JSON.parse(body.isRate);

    return new PriceDeleteDto(id, body.isRate);
  }
}
