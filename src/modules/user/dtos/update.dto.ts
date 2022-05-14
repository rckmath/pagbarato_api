import { InvalidFieldException, MissingFieldException } from '@shared/errors';
import { isValidUUID } from '@shared/utils';
import { UserRoleType } from '../user.enum';

export default class UserUpdateDto {
  constructor(
    public readonly id: string,
    public readonly name?: string,
    public readonly email?: string,
    public readonly role?: UserRoleType,
    public readonly birthDate?: Date | null,
    public readonly preferredSearchRangeInKm?: number,
    public readonly password?: string
  ) {}

  static from(body: Partial<UserUpdateDto>) {
    console.log(body.id);
    if (!body.id) throw new MissingFieldException('id');
    if (body.id && !isValidUUID(body.id)) throw new InvalidFieldException('id', body.id);
    return new UserUpdateDto(body.id, body.name, body.email, body.role, body.birthDate, body.preferredSearchRangeInKm, body.password);
  }
}
