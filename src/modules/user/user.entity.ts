import { MissingFieldException } from '@shared/errors';

import { UserCreateDto } from './dtos';
import { UserRoleType } from './user.enum';

export class UserEntity {
  public readonly name: string;
  public readonly firebaseId: string;
  public readonly role: string;
  public readonly birthDate: Date | null;

  private constructor(user: UserEntity) {
    this.name = user.name;
    this.firebaseId = user.firebaseId;
    this.birthDate = user.birthDate;
    this.role = user.role;
    Object.freeze(this);
  }

  public static create(user: UserCreateDto): UserEntity {
    if (!user.firebaseId) throw new MissingFieldException('firebaseId');

    return new UserEntity({
      name: user.name,
      birthDate: user.birthDate,
      role: user.role || UserRoleType.CONSUMER,
      firebaseId: user.firebaseId,
    });
  }
}
