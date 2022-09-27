import { BaseDeleteDto } from '@http/dto';
import { InvalidFieldException, MissingFieldException } from '@shared/errors';
import { isValidUUID } from '@shared/utils';

export default class EstablishmentDeleteDto extends BaseDeleteDto {
  constructor(public readonly id: string | Array<string>, public isBusinessesHours: boolean = false) {
    super(id);
  }

  static from(body: Partial<EstablishmentDeleteDto>) {
    let id: Array<string> = [];

    if (!body.id) throw new MissingFieldException('id');
    if (typeof body.id == 'string') id = body.id.split(',');
    if (!id.length) throw new MissingFieldException('id');
    id.forEach((x) => {
      if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
    });

    body.isBusinessesHours = body.isBusinessesHours && typeof body.isBusinessesHours == 'string' && JSON.parse(body.isBusinessesHours);

    return new EstablishmentDeleteDto(id, body.isBusinessesHours);
  }
}
