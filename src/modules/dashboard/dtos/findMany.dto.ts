import { BaseFindManyDto } from '@http/dto';
import { InvalidFieldException } from '@shared/errors';
import { arraySplitter, isValidUUID } from '@shared/utils';

export default class UserFindManyDto extends BaseFindManyDto {
  constructor(
    page?: number,
    pageSize?: number,
    orderBy?: string,
    orderDescending?: boolean,
    fromDate?: Date,
    toDate?: Date,
    public readonly id?: string | Array<string>
  ) {
    super(page, pageSize, orderBy, orderDescending, fromDate, toDate);
  }

  static from(body: Partial<UserFindManyDto>) {
    const id = arraySplitter<string>(body.id);

    id.forEach((x) => {
      if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
    });

    body.fromDate = body.fromDate && new Date(body.fromDate);
    body.toDate = body.toDate && new Date(body.toDate);

    return new UserFindManyDto(body.page, body.pageSize, body.orderBy, body.orderDescending, body.fromDate, body.toDate, id);
  }
}
