import { IBusinessHours } from '@modules/business_hours/businessHours.interface';
import { MissingFieldException } from '@shared/errors';

export default class EstablishmentCreateDto {
  constructor(
    public readonly name: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public businessesHours?: Array<IBusinessHours>
  ) {}

  static from(body: Partial<EstablishmentCreateDto>) {
    if (!body.name) throw new MissingFieldException('name');
    if (!body.latitude) throw new MissingFieldException('latitude');
    if (!body.longitude) throw new MissingFieldException('longitude');
    if (body.businessesHours && body.businessesHours.length) {
      body.businessesHours = body.businessesHours.filter((x) => x.openingAt && x.closureAt);
    }
    return new EstablishmentCreateDto(body.name, body.latitude, body.longitude, body.businessesHours);
  }
}
