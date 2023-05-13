import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/auth/auth.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) { }

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    async createUser(Body: CreateUserDto): Promise<UserEntity> {
        const data : CreateUserDto = {...Body}
        data.password = await hash(data.password , 10 )
        const Result: UserEntity = await this.usersRepository.create(Body);
        return await this.usersRepository.save(data)
    }
}
