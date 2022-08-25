import { BaseFindOneDto } from '@http/dto';
import { InvalidFieldException, MissingFieldException } from '@shared/errors';
import { isValidUUID, stringToNumber } from '@shared/utils';

export default class ProductFindOneDto extends BaseFindOneDto {
  constructor(
    public readonly id?: string,
    public rangeFiltering: boolean = true,
    public rangeRadius?: number,
    public usersLatitude?: number,
    public usersLongitude?: number
  ) {
    super(id);
  }

  static from(body: Partial<ProductFindOneDto>) {
    if (!body.id) throw new MissingFieldException('id');
    if (body.id && !isValidUUID(body.id)) throw new InvalidFieldException('id', body.id);
    body.usersLatitude = stringToNumber(body.usersLatitude, true, undefined, 'usersLatitude');
    body.usersLongitude = stringToNumber(body.usersLongitude, true, undefined, 'usersLongitude');
    body.rangeFiltering = body.rangeFiltering && typeof body.rangeFiltering == 'string' && JSON.parse(body.rangeFiltering);
    if (body.rangeFiltering === undefined && !body.usersLatitude) throw new MissingFieldException('usersLatitude');
    if (body.rangeFiltering === undefined && !body.usersLongitude) throw new MissingFieldException('usersLongitude');
    return new ProductFindOneDto(body.id, body.rangeFiltering, body.rangeRadius, body.usersLatitude, body.usersLongitude);
  }
}
