import { MissingFieldError } from '@shared/errors';

export default class CreateUserDto {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly birthDate: Date | null
  ) {}

  static from(body: Partial<CreateUserDto>) {
    if (!body.email) {
      throw new MissingFieldError('name');
    }

    if (!body.name) {
      throw new MissingFieldError('email');
    }

    if (!body.password) {
      throw new MissingFieldError('password');
    }

    return new CreateUserDto(body.name, body.email, body.password, body.birthDate || null);
  }
}
