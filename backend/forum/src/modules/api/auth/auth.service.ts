import {BadRequestException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {EntityManager} from "@mikro-orm/core";
import {User} from "../users/entities/User";

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private jwtService: JwtService,
  ) {}
  async login(id: string) {
    const user = await this.em.findOne(User, {id: id});
    if(!user) {
      throw new BadRequestException('Account not registered. Please sign up')
    }
    const payload = { username: user.username, sub: user.id, role: user.role, email: user.email };
    return {
      access: this.jwtService.sign(payload, {secret: process.env.SECRET}),
    };
  }
}
