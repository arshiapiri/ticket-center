import {
    Body,
    ClassSerializerInterceptor,
    ConflictException,
    Controller,
    NotFoundException,
    Post,
    UseInterceptors
} from '@nestjs/common';
import { loginInfoDto, loginInfoResDto } from './auth.dto';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { sessionEntity } from './auth.entity';
import { CreateUserDto, UserDto } from 'src/user/user.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }
    @Post("/login")
    async login(@Body() loginInfo: loginInfoDto): Promise<loginInfoResDto> {
        const user: UserEntity = await this.userService.findAllByEmail(
            loginInfo.email
        )
        if (!user) throw new NotFoundException("user not found");
        const token: string = await this.authService.generateToken();
        const newSession: sessionEntity = await this.authService.createSession(
            token,
            user
            )
            return new loginInfoResDto(newSession.user , newSession.token)
    }
    @Post('/registration')
    async registration(@Body() userData: CreateUserDto): Promise<UserDto> {
      const user: UserEntity = await this.userService.findAllByEmail(
        userData.email,
      );
      if (!!user) throw new ConflictException('User already exist');
      const newUser: UserEntity = await this.userService.createUser(userData);
      return new UserDto(newUser);
    }
}