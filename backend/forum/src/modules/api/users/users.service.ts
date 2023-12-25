import {ConflictException, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {EntityManager, Ref, wrap} from '@mikro-orm/core';
import {User} from './entities/User';
import {JwtService} from "@nestjs/jwt";
import {UpdateToAdminDto} from "./dto/update-to-admin.dto";
import {Role} from "./entities/Role";
import {Forum} from "../forums/entities/Forum";


@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.em.findOne(User, {id: createUserDto.id});
    if(exists) {
      throw new ConflictException('Email already registered!',{ cause: new Error(), description: 'Some error description' });
    }
    const username = createUserDto.email.split('@')[0];
    const user = this.em.create(
      User,
      {
        id: createUserDto.id,
        email: createUserDto.email,
        username: username,
        role: 1
      }
    );
    await this.em.persist(user).flush();
    const access = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      username: user.username,
      role: user.role
    }, {secret: process.env.SECRET})
    return {access: access};
  }

  findAll() {
    return `This action returns all users`;
  }
  async findAllAdmins() {
    return await this.em.find(User, {role: {name: 'admin'}}, {populate: ['role'], fields: ['username', 'email', 'id', 'role'], orderBy: {username: 'asc'}})
  }

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

  async updateToAdmin(updateToAdminDto: UpdateToAdminDto) {

    // UPDATE METHOD 1
    const user = await this.em.findOne(User, {username: updateToAdminDto.username});
    if(user === null) {
      return null
    }
    const ro = this.em.getReference(Role, 2, {wrapped: true});
    user.role = ro;
    await this.em.flush();
    return user;
  }

  async demoteAdmin(uid: string) {
    // UPDATE METHOD 2
    const admin = this.em.getReference(User, uid);
    wrap(admin).assign({
      role: 1
    })
    await this.em.flush();
    return admin;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
