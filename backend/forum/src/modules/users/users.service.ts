import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {CryptoService} from '../../services/crypto/crypto.service';
import {EntityManager} from '@mikro-orm/core';
import {Users} from './entities/Users';
import {JwtService} from "@nestjs/jwt";
import {UpdateToAdminDto} from "./dto/update-to-admin.dto";
import {Roles} from "./entities/Roles";

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
  async findAllAdmins() {
    return await this.em.find(Users, {role: {role: 'admin'}}, {populate: ['role'], fields: ['username', 'email', 'id', 'role'], orderBy: {username: 'asc'}})
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

  async updateToAdmin(updateToAdminDto: UpdateToAdminDto) {

    const user = await this.em.findOne(Users, {username: updateToAdminDto.username});
    if(user === null) {
      return null
    }
    user.role = this.em.getReference(Roles, 2);
    await this.em.flush();
    return user;
  }

  async demoteAdmin(id: number) {
    const admin = await this.em.findOne(Users, {id: id});
    admin.role = this.em.getReference(Roles, 1);
    await this.em.flush();
    return admin;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
