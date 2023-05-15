import { Exclude } from "class-transformer";
import { UserEntity } from "./user.entity";
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
    id:number;
    email:string;
    isAdmin: boolean;

    @Exclude()
    password:string

    constructor(partial : Partial<UserEntity>) {
        Object.assign(this, partial)
    }
}

export class CreateUserDto {
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @MinLength(8)
    password: string;
  }
