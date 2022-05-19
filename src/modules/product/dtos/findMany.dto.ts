import { InvalidFieldException } from '@shared/errors';
import { BaseFindManyDto } from '@http/dto';
import { arraySplitter, isValidUUID, stringToNumberConversor } from '@shared/utils';

export default class ProductFindManyDto extends BaseFindManyDto {
  constructor(
    page?: number,
    pageSize?: number,
    orderBy?: string,
    orderDescending?: boolean,
    public paginate: boolean = true,
    public name?: string,
    public id?: string | Array<string>
  ) {
    super(page, pageSize, orderBy, orderDescending);
  }

  static from(body: Partial<ProductFindManyDto>) {
    body.id = arraySplitter<string>(body.id);
    body.page = stringToNumberConversor(body.page, false, 1, 'page');
    body.pageSize = stringToNumberConversor(body.pageSize, false, 1, 'pageSize');
    body.orderDescending = body.orderDescending && typeof body.orderDescending == 'string' && JSON.parse(body.orderDescending);
    body.paginate = body.paginate && typeof body.paginate == 'string' && JSON.parse(body.paginate);
    body.id.forEach((x) => {
      if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
    });

    return new ProductFindManyDto(
      body.page,
      body.pageSize,
      body.orderBy,
      body.orderDescending,
      body.paginate,
      body.name,
      body.id
    );
  }
}
