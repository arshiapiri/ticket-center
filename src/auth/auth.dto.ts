import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserDto } from 'src/user/user.dto';
import { UserEntity } from 'src/user/user.entity';

export class loginInfoDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class loginInfoResDto {
  @Type(() => UserDto)
  user: UserDto = new UserDto({})

  token: string

  constructor(partial : Partial<UserEntity>, token: string) {
    Object.assign(this.user, partial)
    this.token = token 
}
}