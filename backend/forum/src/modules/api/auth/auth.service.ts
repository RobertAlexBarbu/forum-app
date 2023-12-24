import {BadRequestException, Injectable} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {EntityManager} from "@mikro-orm/core";
import {User} from "../users/entities/User";

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private jwtService: JwtService,
  ) {}
  async login(uid: string) {
    const user = await this.em.findOne(User, {uid: uid});
    if(!user) {
      throw new BadRequestException('Account not registered. Please sign up')
    }
    const payload = { username: user.username, sub: user.uid, role: user.role, email: user.email };
    return {
      access: this.jwtService.sign(payload),
    };
  }
}
