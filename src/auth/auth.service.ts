import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from "uuid";
import { sessionEntity } from './auth.entity';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(sessionEntity)
        private sessionRepository: Repository<sessionEntity>
    ) { }

    async findSessionByToken(token: string): Promise<sessionEntity> {
        return this.sessionRepository.findOne(
            {
                relations: { user: true }, 
                where: { token }
            }
        )
    }

    public async createSession(
        token: string,
        user: UserEntity,
      ): Promise<sessionEntity> {
        const newSession: sessionEntity = await this.sessionRepository.create({
          user,
          token,
          expireTime: String(this.generateExpireTime()),
        });
        return this.sessionRepository.save(newSession);
      }


    async generateToken(): Promise<string> {
        let token: string = uuidv4();
        let targetSession: sessionEntity = await this.findSessionByToken(token);
        while (!!targetSession) {
            let token = uuidv4();
            let targetSession = await this.findSessionByToken(token);
        }
        return token
    }

    public formatExpireTime(date?:Date): number {
        return Math.floor((date || new Date()).getTime() / 1000)
    }

    public async removeSession(session: sessionEntity): Promise<void> {
        await this.sessionRepository.delete({id : session.id})
    }
    generateExpireTime(): number {
        const date: Date = new Date();
        date.setMinutes(date.getMinutes() + Number(30))
        return this.formatExpireTime(date)
    }
}