import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CryptoService } from '../../services/crypto/crypto.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async validateUser(usernameOrEmail: string, password: string) {
    const user = await this.usersService.findByUsernameOrEmail(usernameOrEmail);
    if (!user) {
      return null;
    }
    const loginPassword = await this.cryptoService.hash(
      password,
      user.passwordSalt,
    );
    if (user.passwordHash !== loginPassword) {
      return null;
    }
    return { id: user.id, username: user.username, role: user.role };
  }

  async login(user: { username: string; id: number; role: any }) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
