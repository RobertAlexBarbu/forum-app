import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersModule} from '../users/users.module';
import {CryptoService} from '../../global/crypto/crypto.service';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './jwt.strategy';
import * as process from "process";
import {FirebaseModule} from "../../global/firebase/firebase.module";
import {FirebaseMiddleware} from "../../global/firebase/firebase.middleware";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: '' + process.env.SECRET,
      signOptions: { expiresIn: '36000s' },
    }),
    PassportModule,
  ],
  providers: [AuthService, CryptoService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(FirebaseMiddleware).forRoutes({
      path: 'auth/login',
      method: RequestMethod.POST
    })
  }
}
