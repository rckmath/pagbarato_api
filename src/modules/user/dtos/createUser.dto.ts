import { MissingFieldException } from '@shared/errors';
import { UserRoleType } from '../user.enum';

export default class UserCreateDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly birthDate: Date | null,
    public readonly role: UserRoleType | null,
    public firebaseId?: string
  ) {}

  static from(body: Partial<UserCreateDto>) {
    if (!body.email) {
      throw new MissingFieldException('name');
    }

    if (!body.name) {
      throw new MissingFieldException('email');
    }

    if (!body.password) {
      throw new MissingFieldException('password');
    }

    return new UserCreateDto(body.name, body.email, body.password, body.birthDate || null, body.role || null);
  }
}
