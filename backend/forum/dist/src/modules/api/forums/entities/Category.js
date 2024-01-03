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
exports.Category = void 0;
const core_1 = require("@mikro-orm/core");
const Forum_1 = require("./Forum");
const Post_1 = require("../../posts/entities/Post");
let Category = class Category {
    constructor() {
        this.posts = new core_1.Collection(this);
    }
};
exports.Category = Category;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, core_1.ManyToOne)(),
    __metadata("design:type", Forum_1.Forum)
], Category.prototype, "forum", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Post_1.Post, (post) => post.category),
    __metadata("design:type", Object)
], Category.prototype, "posts", void 0);
exports.Category = Category = __decorate([
    (0, core_1.Entity)()
], Category);
//# sourceMappingURL=Category.js.map