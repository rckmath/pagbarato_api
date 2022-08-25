import { InvalidFieldException } from '@shared/errors';
import { BaseFindManyDto } from '@http/dto';
import { arraySplitter, isValidUUID, stringToNumber } from '@shared/utils';

export default class EstablishmentFindManyDto extends BaseFindManyDto {
  constructor(
    page?: number,
    pageSize?: number,
    orderBy?: string,
    orderDescending?: boolean,
    fromDate?: Date,
    toDate?: Date,
    public paginate: boolean = true,
    public readonly name?: string,
    public id?: string | Array<string>
  ) {
    super(page, pageSize, orderBy, orderDescending, fromDate, toDate);
  }

  static from(body: Partial<EstablishmentFindManyDto>) {
    body.id = arraySplitter<string>(body.id);
    body.page = stringToNumber(body.page, false, 1, 'page');
    body.pageSize = stringToNumber(body.pageSize, false, 1, 'pageSize');
    body.orderDescending = body.orderDescending && typeof body.orderDescending == 'string' && JSON.parse(body.orderDescending);
    body.paginate = body.paginate && typeof body.paginate == 'string' && JSON.parse(body.paginate);
    body.id.forEach((x) => {
      if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
    });
    body.fromDate = body.fromDate && new Date(body.fromDate);
    body.toDate = body.toDate && new Date(body.toDate);
    return new EstablishmentFindManyDto(
      body.page,
      body.pageSize,
      body.orderBy,
      body.orderDescending,
      body.fromDate,
      body.toDate,
      body.paginate,
      body.name,
      body.id
    );
  }
}
