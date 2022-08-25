import { BaseFindManyDto } from '@http/dto';
import { InvalidFieldException } from '@shared/errors';
import { arraySplitter, isValidUUID, stringToNumber } from '@shared/utils';
import { UserRoleType } from '../user.enum';

export default class UserFindManyDto extends BaseFindManyDto {
  constructor(
    page?: number,
    pageSize?: number,
    orderBy?: string,
    orderDescending?: boolean,
    fromDate?: Date,
    toDate?: Date,
    public paginate: boolean = true,
    public readonly name?: string,
    public readonly email?: string,
    public readonly birthDate?: Date,
    public readonly id?: string | Array<string>,
    public readonly role?: UserRoleType | Array<UserRoleType>
  ) {
    super(page, pageSize, orderBy, orderDescending, fromDate, toDate);
  }

  static from(body: Partial<UserFindManyDto>) {
    const id = arraySplitter<string>(body.id);
    const role = arraySplitter<UserRoleType>(body.role);

    id.forEach((x) => {
      if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
    });

    body.page = stringToNumber(body.page, false, 1, 'page');
    body.pageSize = stringToNumber(body.pageSize, false, 1, 'pageSize');
    body.paginate = body.paginate && typeof body.paginate == 'string' && JSON.parse(body.paginate);
    body.orderDescending = body.orderDescending && typeof body.orderDescending == 'string' && JSON.parse(body.orderDescending);
    body.fromDate = body.fromDate && new Date(body.fromDate);
    body.toDate = body.toDate && new Date(body.toDate);

    return new UserFindManyDto(
      body.page,
      body.pageSize,
      body.orderBy,
      body.orderDescending,
      body.fromDate,
      body.toDate,
      body.paginate,
      body.name,
      body.email,
      body.birthDate,
      id,
      role
    );
  }
}
