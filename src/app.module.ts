import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { sessionEntity } from './auth/auth.entity';
import { AuthorizationMiddleware } from './auth/auth.middelware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: "root",
      password: "eza3810421",
      database: "sample2",
      entities: [UserEntity, sessionEntity],
      synchronize: true,
    }),
    AuthModule,
    UserModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthorizationMiddleware)
      .forRoutes("user");
  }
}
