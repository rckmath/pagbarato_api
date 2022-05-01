import { IUser } from '../user.interface';

export default class UserDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly birthDate: Date | null,
    public readonly role?: string,
    public readonly updatedAt?: Date
  ) {}

  static from(entity: IUser) {
    return new UserDto(entity.id, entity.name, entity.email, entity.createdAt, entity.birthDate);
  }

  static fromAdmin(entity: IUser) {
    return new UserDto(entity.id, entity.name, entity.email, entity.createdAt, entity.birthDate, entity.role, entity.updatedAt);
  }

  static fromMany(subscribers: IUser[]) {
    return subscribers.map((user) => UserDto.fromAdmin(user));
  }
}
