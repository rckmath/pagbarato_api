import { MissingFieldException } from '@shared/errors';
import { UserComplete } from '../user.interface';

export default class UserDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly email?: string,
    public readonly birthDate?: Date | null,
    public readonly role?: string,
    public readonly updatedAt?: Date
  ) {}

  static from(user: Partial<UserComplete>) {
    if (!user.id) throw new MissingFieldException('id');
    if (!user.name) throw new MissingFieldException('name');
    if (!user.createdAt) throw new MissingFieldException('createdAt');

    return new UserDto(user.id, user.name, user.createdAt, user.email, user.birthDate);
  }

  static fromAdmin(user: UserComplete) {
    return new UserDto(user.id, user.name, user.createdAt, user.email, user.birthDate, user.role, user.updatedAt);
  }

  static fromMany(users: UserComplete[]) {
    return users.map((user) => UserDto.fromAdmin(user));
  }
}
