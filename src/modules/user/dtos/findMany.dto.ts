import { UserRoleType } from '../user.enum';

export default class UserFindManyDto {
  constructor(
    public readonly id?: string,
    public readonly name?: string,
    public readonly email?: string,
    public readonly birthDate?: Date,
    public readonly role?: UserRoleType
  ) {}

  static from(body: Partial<UserFindManyDto>) {
    return new UserFindManyDto(body.id, body.name, body.email, body.birthDate, body.role);
  }
}
