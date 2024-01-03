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
exports.ForumsController = void 0;
const common_1 = require("@nestjs/common");
const forums_service_1 = require("./forums.service");
const create_forum_dto_1 = require("./dto/create-forum.dto");
const update_forum_dto_1 = require("./dto/update-forum.dto");
const is_admin_guard_1 = require("../../../shared/guards/is-admin.guard");
const firebase_guard_1 = require("../../../shared/guards/firebase.guard");
let ForumsController = class ForumsController {
    constructor(forumsService) {
        this.forumsService = forumsService;
    }
    create(createForumDto) {
        return this.forumsService.create(createForumDto);
    }
    findAll() {
        return this.forumsService.findAll();
    }
    findTrending() {
        return this.forumsService.findTrending();
    }
    findOne(id) {
        return this.forumsService.findOne(+id);
    }
    findOneForEdit(id) {
        return this.forumsService.findOneForEdit(+id);
    }
    update(id, updateForumDto) {
        return this.forumsService.update(+id, updateForumDto);
    }
    remove(id) {
        return this.forumsService.remove(+id);
    }
};
exports.ForumsController = ForumsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(firebase_guard_1.FirebaseGuard, is_admin_guard_1.IsAdminGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_forum_dto_1.CreateForumDto]),
    __metadata("design:returntype", void 0)
], ForumsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ForumsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('trending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ForumsController.prototype, "findTrending", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForumsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('edit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForumsController.prototype, "findOneForEdit", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(firebase_guard_1.FirebaseGuard, is_admin_guard_1.IsAdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_forum_dto_1.UpdateForumDto]),
    __metadata("design:returntype", void 0)
], ForumsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(firebase_guard_1.FirebaseGuard, is_admin_guard_1.IsAdminGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForumsController.prototype, "remove", null);
exports.ForumsController = ForumsController = __decorate([
    (0, common_1.Controller)('api/forums'),
    __metadata("design:paramtypes", [forums_service_1.ForumsService])
], ForumsController);
//# sourceMappingURL=forums.controller.js.map