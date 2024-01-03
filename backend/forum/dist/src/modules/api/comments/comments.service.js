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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const Comment_1 = require("./entities/Comment");
const email_service_1 = require("../../global/email/email.service");
let CommentsService = class CommentsService {
    constructor(em, emailService) {
        this.em = em;
        this.emailService = emailService;
    }
    async create(createCommentDto, userId, username) {
        const commentsCount = await this.em
            .getRepository(Comment_1.Comment)
            .count({ post: createCommentDto.postId });
        if (commentsCount === 0) {
            this.emailService
                .sendMail({
                fromName: username,
                toName: createCommentDto.username,
                message: createCommentDto.content,
                toEmail: createCommentDto.userEmail,
                postName: createCommentDto.postName,
            })
                .catch((err) => {
                console.log(err);
            });
        }
        const post = this.em.create(Comment_1.Comment, {
            user: userId,
            post: createCommentDto.postId,
            content: createCommentDto.content,
        });
        this.em.persist(post);
        await this.em.flush();
        return (0, core_1.serialize)(post, {
            forceObject: true,
        });
    }
    async remove(id) {
        const comment = this.em.getReference(Comment_1.Comment, id);
        this.em.remove(comment);
        await this.em.flush();
        return comment;
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager,
        email_service_1.EmailService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map