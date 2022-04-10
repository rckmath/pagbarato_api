import { BaseEntity } from '@infra/database/base.entity';
import { CreateUserDto } from './user.dto';

export class UserEntity extends BaseEntity {
  public constructor(_user: CreateUserDto) {
    super();
  }
}
 