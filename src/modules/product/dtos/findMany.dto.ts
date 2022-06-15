import { BaseFindManyDto } from '@http/dto';
import { arraySplitter, isValidUUID, stringToNumber } from '@shared/utils';
import { InvalidFieldException, MissingFieldException } from '@shared/errors';

export default class ProductFindManyDto extends BaseFindManyDto {
  constructor(
    page?: number,
    pageSize?: number,
    orderBy?: string,
    orderDescending = false,
    public paginate: boolean = true,
    public priceFiltering: boolean = true,
    public rangeRadius?: number,
    public usersLatitude?: number,
    public usersLongitude?: number,
    public name?: string,
    public id?: string | Array<string>
  ) {
    super(page, pageSize, orderBy, orderDescending);
  }

  static from(body: Partial<ProductFindManyDto>) {
    body.id = arraySplitter<string>(body.id);
    body.page = stringToNumber(body.page, false, 1, 'page');
    body.pageSize = stringToNumber(body.pageSize, false, 1, 'pageSize');
    body.usersLatitude = stringToNumber(body.usersLatitude, true, undefined, 'usersLatitude');
    body.usersLongitude = stringToNumber(body.usersLongitude, true, undefined, 'usersLongitude');
    body.paginate = body.paginate && typeof body.paginate == 'string' && JSON.parse(body.paginate);
    body.priceFiltering = body.priceFiltering && typeof body.priceFiltering == 'string' && JSON.parse(body.priceFiltering);
    body.orderDescending = body.orderDescending && typeof body.orderDescending == 'string' && JSON.parse(body.orderDescending);
    body.name = body.name?.split(' ').join('&');
    body.id.forEach((x) => {
      if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
    });

    if (body.priceFiltering === undefined && !body.usersLatitude) throw new MissingFieldException('usersLatitude');
    if (body.priceFiltering === undefined && !body.usersLongitude) throw new MissingFieldException('usersLongitude');

    return new ProductFindManyDto(
      body.page,
      body.pageSize,
      body.orderBy,
      body.orderDescending,
      body.paginate,
      body.priceFiltering,
      body.rangeRadius,
      body.usersLatitude,
      body.usersLongitude,
      body.name,
      body.id
    );
  }
}
