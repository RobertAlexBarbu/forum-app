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
import {FirebaseMiddleware} from "../../global/firebase/firebase.middleware";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    JwtModule.register({
      global: true,
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
