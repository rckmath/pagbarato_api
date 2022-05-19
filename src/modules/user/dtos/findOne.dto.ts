import { BaseFindOneDto } from '@http/dto';
import { isValidUUID } from '@shared/utils';
import { InvalidFieldException, MissingFieldException } from '@shared/errors';

export default class UserFindOneDto extends BaseFindOneDto {
  constructor(public id?: string, public firebaseId?: string, public email?: string, public withFirebaseId?: boolean) {
    super(id);
  }

  static from(body: Partial<UserFindOneDto>) {
    if (!body.id) throw new MissingFieldException('id');
    body.withFirebaseId = body.withFirebaseId && typeof body.withFirebaseId == 'string' && JSON.parse(body.withFirebaseId);
    if (body.withFirebaseId) {
      body.firebaseId = body.id;
      body.id = undefined;
    }
    if (body.id && !body.withFirebaseId && !isValidUUID(body.id)) throw new InvalidFieldException('id', body.id);
    return new UserFindOneDto(body.id, body.firebaseId, body.email, body.withFirebaseId);
  }
}
