"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const User_1 = require("./entities/User");
const Role_1 = require("./entities/Role");
let UsersService = class UsersService {
    constructor(em) {
        this.em = em;
    }
    async create(createUserDto) {
        const exists = await this.em.findOne(User_1.User, { id: createUserDto.id });
        if (exists) {
            throw new common_1.ConflictException('Email already registered!', {
                cause: new Error(),
                description: 'Some error description',
            });
        }
        const count = await this.em.getRepository(User_1.User).count();
        const username = createUserDto.email.split('@')[0] + count;
        const user = this.em.create(User_1.User, {
            id: createUserDto.id,
            email: createUserDto.email,
            username: username,
            role: 1,
        });
        await this.em.persist(user).flush();
        return {
            id: user.id,
            role: user.role.id,
            username: user.username,
            email: user.email
        };
    }
    findAll() {
        return `This action returns all users`;
    }
    async findAllAdmins() {
        return await this.em.find(User_1.User, { role: { name: 'admin' } }, {
            populate: ['role'],
            fields: ['username', 'email', 'id', 'role'],
            orderBy: { username: 'asc' },
        });
    }
    async findByUsernameOrEmail(usernameOrEmail) {
        return await this.em.findOne(User_1.User, {
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
        }, { populate: ['role'] });
    }
    async updateToAdmin(updateToAdminDto) {
        const user = await this.em.findOne(User_1.User, {
            username: updateToAdminDto.username,
        });
        if (user === null) {
            return null;
        }
        user.role = this.em.getReference(Role_1.Role, 2, { wrapped: true });
        await this.em.flush();
        return user;
    }
    async demoteAdmin(uid) {
        const admin = this.em.getReference(User_1.User, uid);
        (0, core_1.wrap)(admin).assign({
            role: 1,
        });
        await this.em.flush();
        return admin;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], UsersService);
//# sourceMappingURL=users.service.js.map