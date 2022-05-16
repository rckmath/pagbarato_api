import { InvalidFieldException } from '@shared/errors';
import { BaseFindManyDto } from '@shared/infra/http/dto';
import { isValidUUID } from '@shared/utils';
import { UserRoleType } from '../user.enum';

export default class UserFindManyDto extends BaseFindManyDto {
  constructor(
    page?: number,
    pageSize?: number,
    orderBy?: string,
    orderDescending?: boolean,
    public readonly name?: string,
    public readonly email?: string,
    public readonly birthDate?: Date,
    public readonly id?: string | Array<string>,
    public readonly role?: UserRoleType | Array<UserRoleType>
  ) {
    super(page, pageSize, orderBy, orderDescending);
  }

  static from(body: Partial<UserFindManyDto>) {
    let id;
    let role;

    if (body.id) {
      if (typeof body.id == 'string') id = body.id.split(',');

      if (id) {
        id.forEach((x) => {
          if (!isValidUUID(x)) throw new InvalidFieldException('id', x);
        });
      }
    }

    if (body.role && typeof body.role == 'string') {
      role = body.role.split(',') as Array<UserRoleType>;
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

    return new UserFindManyDto(
      body.page,
      body.pageSize,
      body.orderBy,
      body.orderDescending,
      body.name,
      body.email,
      body.birthDate,
      id,
      role 
    );
  }
}
