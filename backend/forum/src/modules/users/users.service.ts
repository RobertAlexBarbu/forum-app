import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CryptoService } from '../../services/crypto/crypto.service';
import { EntityManager } from '@mikro-orm/core';
import { Users } from './entities/Users';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const passwordSalt = this.cryptoService.generateSalt(64);
    const passwordHash = await this.cryptoService.hash(
      createUserDto.password,
      passwordSalt,
    );
    const user = this.em.create(
      Users,
      Object.assign(
        {},
        createUserDto,
        { passwordSalt, passwordHash },
        { role: 1 },
      ),
    );
    await this.em.persist(user).flush();
    delete user.passwordHash;
    delete user.passwordSalt;
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  async findByUsernameOrEmail(usernameOrEmail: string) {
    return await this.em.findOne(
      Users,
      {
        $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
      },
      { populate: ['role'] },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
