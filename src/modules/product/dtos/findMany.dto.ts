import { InvalidFieldException } from '@shared/errors';
import { BaseFindManyDto } from '@http/dto';
import { isValidUUID } from '@shared/utils';

export default class ProductFindManyDto extends BaseFindManyDto {
  constructor(
    page?: number,
    pageSize?: number,
    orderBy?: string,
    orderDescending?: boolean,
    public readonly name?: string,
    public readonly id?: string | Array<string>
  ) {
    super(page, pageSize, orderBy, orderDescending);
  }

  static from(body: Partial<ProductFindManyDto>) {
    let id;

    if (body.id) {
      if (typeof body.id == 'string') id = body.id.split(',');

      if (id) {
        id.forEach((x) => {
          if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
        });
      }
    }

    if (body.page) {
      if (body.page < 1) throw new InvalidFieldException('page', body.page);
      if (typeof body.page == 'string') body.page = parseInt(body.page);
    }

    if (body.pageSize) {
      if (body.pageSize < 1) throw new InvalidFieldException('pageSize', body.pageSize);
      if (typeof body.pageSize == 'string') body.pageSize = parseInt(body.pageSize);
    }

    if (body.orderDescending && typeof body.orderDescending == 'string') {
      body.orderDescending = JSON.parse(body.orderDescending);
    }

    return new ProductFindManyDto(body.page, body.pageSize, body.orderBy, body.orderDescending, body.name, id);
  }
}
