"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const common_1 = require("@nestjs/common");
const util = require("util");
const crypto = require("crypto");
let CryptoService = class CryptoService {
    constructor() {
        this.pbkdf2 = util.promisify(crypto.pbkdf2);
        this.iterations = 10000;
        this.keyLength = 32;
        this.digest = 'sha512';
    }
    async hash(data, salt) {
        const dataHashBuffer = await this.pbkdf2(data, salt, this.iterations, this.keyLength, this.digest);
        return dataHashBuffer.toString('hex');
    }
    generateSalt(size) {
        return crypto.randomBytes(size).toString('hex');
    }
};
exports.CryptoService = CryptoService;
exports.CryptoService = CryptoService = __decorate([
    (0, common_1.Injectable)()
], CryptoService);
//# sourceMappingURL=crypto.service.js.map