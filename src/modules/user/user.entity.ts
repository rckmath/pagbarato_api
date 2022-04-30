import { BaseEntity } from '@infra/database/base.entity';
import { InvalidFieldError } from '@shared/errors';

import { UserRoleType } from './user.enum';
import { UserCreate } from './user.interface';

import { emailValidation, passwordValidation } from './validators';

export class UserEntity extends BaseEntity {
  public readonly email: string;
  public readonly name: string;
  public readonly password: string;
  public readonly role: string;
  public readonly birthDate: Date | null;

  private constructor(user: UserCreate) {
    super();
    this.email = user.email;
    this.name = user.name;
    this.password = user.password;
    this.birthDate = user.birthDate;
    this.role = user.role as string;
    Object.freeze(this);
  }

  public static create(user: UserCreate): UserEntity {
    const validatedEmail = emailValidation(user.email);
    if (!validatedEmail) { throw new InvalidFieldError('email', user.email); }
    
    const validatedPassword = passwordValidation(user.password);
    if (!validatedPassword) { throw new InvalidFieldError('password'); }
    
    return new UserEntity({
      email: validatedEmail,
      password: validatedPassword,
      name: user.name,
      birthDate: user.birthDate,
      role: user.role || UserRoleType.CONSUMER,
    });
  }
}
