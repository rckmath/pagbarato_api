import { InvalidFieldException } from '@shared/errors';
import { BaseFindManyDto } from '@http/dto';
import { arraySplitter, isValidUUID, stringToNumberConversor } from '@shared/utils';

export default class PriceFindManyDto extends BaseFindManyDto {
  constructor(
    page?: number,
    pageSize?: number,
    orderBy?: string,
    orderDescending?: boolean,
    public readonly id?: string | Array<string>
  ) {
    super(page, pageSize, orderBy, orderDescending);
  }

  static from(body: Partial<PriceFindManyDto>) {
    const id = arraySplitter<string>(body.id);

    id.forEach((x) => {
      if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
    });

    body.page = stringToNumberConversor(body.page, false, 1, 'page');
    body.pageSize = stringToNumberConversor(body.pageSize, false, 1, 'pageSize');
    body.orderDescending = body.orderDescending && typeof body.orderDescending == 'string' && JSON.parse(body.orderDescending);

    return new PriceFindManyDto(body.page, body.pageSize, body.orderBy, body.orderDescending, id);
  }
}
