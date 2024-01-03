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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseGuard = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../../modules/global/firebase/firebase.service");
const core_1 = require("@mikro-orm/core");
const User_1 = require("../../modules/api/users/entities/User");
let FirebaseGuard = class FirebaseGuard {
    constructor(firebaseService, em) {
        this.firebaseService = firebaseService;
        this.em = em;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const header = request.headers['authorization'];
        if (!header) {
            return false;
        }
        const token = header.split(' ')[1];
        if (!token) {
            return false;
        }
        const auth = this.firebaseService.getAuth();
        try {
            const data = await auth.verifyIdToken(token);
            request.user = await this.em.findOne(User_1.User, { id: data.uid });
            return true;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
};
exports.FirebaseGuard = FirebaseGuard;
exports.FirebaseGuard = FirebaseGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(firebase_service_1.FirebaseService)),
    __param(1, (0, common_1.Inject)(core_1.EntityManager)),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService, core_1.EntityManager])
], FirebaseGuard);
//# sourceMappingURL=firebase.guard.js.map