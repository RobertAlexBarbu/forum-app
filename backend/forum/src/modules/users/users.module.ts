import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CryptoService } from '../../services/crypto/crypto.service';
import {ConfigModule} from "@nestjs/config";

@Module({
  controllers: [UsersController],
  imports: [ConfigModule],
  providers: [UsersService, CryptoService],
  exports: [UsersService],
})
export class UsersModule {}
