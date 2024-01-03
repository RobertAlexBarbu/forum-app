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
exports.PostLike = void 0;
const core_1 = require("@mikro-orm/core");
const Post_1 = require("./Post");
const User_1 = require("../../users/entities/User");
let PostLike = class PostLike {
};
exports.PostLike = PostLike;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], PostLike.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => User_1.User, onDelete: 'cascade', nullable: true }),
    __metadata("design:type", User_1.User)
], PostLike.prototype, "user", void 0);
__decorate([
    (0, core_1.ManyToOne)({ entity: () => Post_1.Post, onDelete: 'cascade', nullable: true }),
    __metadata("design:type", Post_1.Post)
], PostLike.prototype, "post", void 0);
exports.PostLike = PostLike = __decorate([
    (0, core_1.Entity)()
], PostLike);
//# sourceMappingURL=PostLike.js.map