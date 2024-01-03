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
exports.FirebaseMiddleware = void 0;
const common_1 = require("@nestjs/common");
const firebase_service_1 = require("../../modules/global/firebase/firebase.service");
let FirebaseMiddleware = class FirebaseMiddleware {
    constructor(firebaseService) {
        this.firebaseService = firebaseService;
    }
    async use(req, res, next) {
        const token = req.body.firebaseToken;
        const auth = this.firebaseService.getAuth();
        const data = await auth.verifyIdToken(token);
        req.body = {
            email: data.email,
            id: data.uid,
        };
        next();
    }
};
exports.FirebaseMiddleware = FirebaseMiddleware;
exports.FirebaseMiddleware = FirebaseMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_service_1.FirebaseService])
], FirebaseMiddleware);
//# sourceMappingURL=firebase.middleware.js.map