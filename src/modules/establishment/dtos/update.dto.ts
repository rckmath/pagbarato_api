import BusinessHoursDto from '@business_hours/dtos/businessHours.dto';
import { InvalidFieldException, MissingFieldException } from '@shared/errors';
import { isValidUUID } from '@shared/utils';

export default class EstablishmentUpdateDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly latitude?: number,
    public readonly longitude?: number,
    public businessesHours?: Array<BusinessHoursDto>
  ) {}

  static from(body: Partial<EstablishmentUpdateDto>) {
    if (!body.id) throw new MissingFieldException('id');
    if (body.id && !isValidUUID(body.id)) throw new InvalidFieldException('id', body.id);
    return new EstablishmentUpdateDto(body.id, body.name, body.latitude, body.longitude);
  }
}
