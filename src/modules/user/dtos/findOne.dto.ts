import { BaseFindOneDto } from '@http/dto';

export default class UserFindOneDto extends BaseFindOneDto {
  constructor(public readonly id?: string, public readonly firebaseId?: string, public readonly email?: string) {
    super(id);
  }
}
