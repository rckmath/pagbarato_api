import { MissingFieldException } from '@shared/errors';
import { UserRoleType } from '../user.enum';
import { IUser } from '../user.interface';

export default class UserDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly preferredSearchRangeInKm: number,
    public readonly role: UserRoleType,
    public readonly createdAt: Date,
    public readonly birthDate?: Date | null,
    public readonly updatedAt?: Date
  ) {}

  static from(user: Partial<IUser>) {
    if (!user.id) throw new MissingFieldException('id');
    if (!user.name) throw new MissingFieldException('name');
    if (!user.role) throw new MissingFieldException('role');
    if (!user.email) throw new MissingFieldException('email');
    if (!user.createdAt) throw new MissingFieldException('createdAt');
    if (!user.preferredSearchRangeInKm) throw new MissingFieldException('preferredSearchRangeInKm');
    return new UserDto(
      user.id,
      user.name,
      user.email,
      user.preferredSearchRangeInKm.toNumber(),
      user.role,
      user.createdAt,
      user.birthDate,
      user.updatedAt
    );
  }

  static fromMany(users: Array<IUser>) {
    return users.map((user) => UserDto.from(user));
  }
}
