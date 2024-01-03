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
exports.Forum = void 0;
const core_1 = require("@mikro-orm/core");
const Category_1 = require("./Category");
const Post_1 = require("../../posts/entities/Post");
let Forum = class Forum {
    constructor() {
        this.categories = new core_1.Collection(this);
        this.posts = new core_1.Collection(this);
    }
};
exports.Forum = Forum;
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Forum.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Forum.prototype, "name", void 0);
__decorate([
    (0, core_1.OneToMany)(() => Category_1.Category, (category) => category.forum),
    __metadata("design:type", Object)
], Forum.prototype, "categories", void 0);
__decorate([
    (0, core_1.OneToMany)({
        entity: () => Post_1.Post,
        mappedBy: (post) => post.forum,
        orderBy: { createdAt: 'desc' },
    }),
    __metadata("design:type", Object)
], Forum.prototype, "posts", void 0);
exports.Forum = Forum = __decorate([
    (0, core_1.Entity)()
], Forum);
//# sourceMappingURL=Forum.js.map