import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(user: { username: string; id: number; role: any }) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access: this.jwtService.sign(payload),
    };
  }
}
