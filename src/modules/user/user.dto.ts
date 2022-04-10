import { UserEntity } from "./user.entity";
import { IUserDto } from "./user.interface";

export class CreateUserDto {
  public constructor(_userDto: IUserDto) {}
}

export class UserDto {
  public constructor(_userEntity: UserEntity) {}
}