import { MissingFieldException } from '@shared/errors';

export default class UserFindOneDto {
  constructor(public readonly id: string) {}

  static from(body: Partial<UserFindOneDto>) {
    console.log(body)

    if (!body.id) {
      throw new MissingFieldException('id');
    }

    return new UserFindOneDto(body.id);
  }
}