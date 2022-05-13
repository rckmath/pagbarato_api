import { MissingFieldException } from '@shared/errors';
import { UserRoleType } from '../user.enum';

export default class UserUpdateDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly role: UserRoleType,
    public readonly birthDate?: Date | null,
    public readonly password?: string | null,
  ) {}

  static from(body: Partial<UserUpdateDto>) {
    if (!body.id) throw new MissingFieldException('id');
    if (!body.name) throw new MissingFieldException('name');
    if (!body.role) throw new MissingFieldException('role');
    return new UserUpdateDto(body.id, body.name, body.role, body.birthDate);
  }
}
