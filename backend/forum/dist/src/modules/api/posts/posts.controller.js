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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
const is_admin_guard_1 = require("../../../shared/guards/is-admin.guard");
const can_edit_post_guard_1 = require("../../../shared/guards/can-edit-post.guard");
const firebase_guard_1 = require("../../../shared/guards/firebase.guard");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    create(createPostDto, req) {
        return this.postsService.create(createPostDto, req.user.id);
    }
    findAllByForum(id) {
        return this.postsService.findAllByForum(+id);
    }
    findOne(id) {
        return this.postsService.findOne(+id);
    }
    update(id, updatePostDto) {
        return this.postsService.update(+id, updatePostDto);
    }
    remove(id) {
        return this.postsService.remove(+id);
    }
    likePost(id, req) {
        return this.postsService.likePost(+id, req.user.id);
    }
    dislikePost(id, req) {
        return this.postsService.dislikePost(+id, req.user.id);
    }
};
exports.PostsController = PostsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(firebase_guard_1.FirebaseGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('forum/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findAllByForum", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(firebase_guard_1.FirebaseGuard, can_edit_post_guard_1.CanEditPostGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(firebase_guard_1.FirebaseGuard, is_admin_guard_1.IsAdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('likes/:id'),
    (0, common_1.UseGuards)(firebase_guard_1.FirebaseGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "likePost", null);
__decorate([
    (0, common_1.Delete)('likes/:id'),
    (0, common_1.UseGuards)(firebase_guard_1.FirebaseGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostsController.prototype, "dislikePost", null);
exports.PostsController = PostsController = __decorate([
    (0, common_1.Controller)('api/posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
//# sourceMappingURL=posts.controller.js.map