import {ConflictException, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {CryptoService} from '../../global/crypto/crypto.service';
import {EntityManager} from '@mikro-orm/core';
import {User} from './entities/User';
import {JwtService} from "@nestjs/jwt";

import {ConfigService} from "@nestjs/config";

@Injectable()
export class UsersService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.em.findOne(User, {uid: createUserDto.uid});;
    if(exists) {
      throw new ConflictException('Email already registered!',{ cause: new Error(), description: 'Some error description' });
    }
    const username = createUserDto.email.split('@')[0];
    const user = this.em.create(
      User,
      {
        uid: createUserDto.uid,
        email: createUserDto.email,
        username: username,
        role: 1
      }
    );
    await this.em.persist(user).flush();
    const access = this.jwtService.sign({
      sub: user.uid,
      email: user.email,
      username: user.username,
      role: user.role
    })
    return {access: access};
  }

  findAll() {
    return `This action returns all users`;
  }
  // async findAllAdmins() {
  //   return await this.em.find(AppUser, {role: {role: 'admin'}}, {populate: ['role'], fields: ['username', 'email', 'uid', 'role'], orderBy: {username: 'asc'}})
  // }

  async findByUsernameOrEmail(usernameOrEmail: string) {
    return await this.em.findOne(
      User,
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

  // async updateToAdmin(updateToAdminDto: UpdateToAdminDto) {
  //
  //   const user = await this.em.findOne(AppUser, {username: updateToAdminDto.username});
  //   if(user === null) {
  //     return null
  //   }
  //   user.role = this.em.getReference(Role, 2);
  //   await this.em.flush();
  //   return user;
  // }

  // async demoteAdmin(uid: string) {
  //   const admin = await this.em.findOne(AppUser, {uid: uid});
  //   admin.role = this.em.getReference(Role, 1);
  //   await this.em.flush();
  //   return admin;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
