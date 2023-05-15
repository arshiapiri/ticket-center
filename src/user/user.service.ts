import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from 'src/user/user.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) { }

    findAll(): Promise<UserEntity[]> {
        return this.usersRepository.find();
    }

    findAllByEmail(email: string): Promise<UserEntity> {
        return this.usersRepository.findOneBy({ email });
    }

    async createUser(Body: CreateUserDto): Promise<UserEntity> {
        const data : CreateUserDto = {...Body}
        data.password = await hash(data.password , 10 )
        const Result: UserEntity = await this.usersRepository.create(data);
        return await this.usersRepository.save(Result)
    }
}
