import { InvalidFieldException } from '@shared/errors';
import { BaseFindManyDto } from '@http/dto';
import { arraySplitter, isValidUUID, stringToNumber } from '@shared/utils';

export default class PriceFindManyDto extends BaseFindManyDto {
  constructor(
    page?: number,
    pageSize?: number,
    orderBy?: string,
    orderDescending?: boolean,
    public paginate: boolean = true,
    public includeDetails: boolean = false,
    public id?: string | Array<string>,
    public userId?: string | Array<string>
  ) {
    super(page, pageSize, orderBy, orderDescending);
  }

  static from(body: Partial<PriceFindManyDto>) {
    body.id = arraySplitter<string>(body.id);
    body.userId = arraySplitter<string>(body.userId);
    body.page = stringToNumber(body.page, false, 1, 'page');
    body.pageSize = stringToNumber(body.pageSize, false, 1, 'pageSize');
    body.orderDescending = body.orderDescending && typeof body.orderDescending == 'string' && JSON.parse(body.orderDescending);
    body.paginate = body.paginate && typeof body.paginate == 'string' && JSON.parse(body.paginate);
    body.includeDetails = body.includeDetails && typeof body.includeDetails == 'string' && JSON.parse(body.includeDetails);
    body.id.forEach((x) => {
      if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
    });
    body.userId.forEach((x) => {
      if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
    });
    return new PriceFindManyDto(
      body.page,
      body.pageSize,
      body.orderBy,
      body.orderDescending,
      body.paginate,
      body.includeDetails,
      body.id,
      body.userId
    );
  }
}
