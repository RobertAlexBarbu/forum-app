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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const User_1 = require("../users/entities/User");
let AuthService = class AuthService {
    constructor(em) {
        this.em = em;
    }
    async login(id) {
        const user = await this.em.findOne(User_1.User, { id: id });
        if (!user) {
            throw new common_1.BadRequestException('Account not registered. Please sign up');
        }
        const authState = {
            username: user.username,
            id: user.id,
            role: user.role.id,
            email: user.email,
        };
        return authState;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], AuthService);
//# sourceMappingURL=auth.service.js.map