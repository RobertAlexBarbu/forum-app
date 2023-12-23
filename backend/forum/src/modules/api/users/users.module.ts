import {
  MiddlewareConsumer,
  Module, NestModule,
  RequestMethod
} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {CryptoService} from '../../global/crypto/crypto.service';
import {ConfigModule} from "@nestjs/config";
import {FirebaseMiddleware} from "../../global/firebase/firebase.middleware";
import {FirebaseModule} from "../../global/firebase/firebase.module";


@Module({
  controllers: [UsersController],
  imports: [ConfigModule],
  providers: [UsersService, CryptoService],
  exports: [UsersService],
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FirebaseMiddleware).forRoutes({
      path: 'users', method: RequestMethod.POST
    })
  }
}
