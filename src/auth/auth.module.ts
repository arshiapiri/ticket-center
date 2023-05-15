import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/user.entity';
import { sessionEntity } from './auth.entity';

@Module({
  imports : [TypeOrmModule.forFeature([UserEntity , sessionEntity]) , UserModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports : [AuthService]
})
export class AuthModule {}