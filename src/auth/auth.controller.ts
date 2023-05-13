import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService : UserService) {}
    @Post()
    async registration(@Body() userData : CreateUserDto): Promise<UserEntity> {
       return this.userService.createUser(userData);
    }
}
