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
exports.ForumsService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const Forum_1 = require("./entities/Forum");
const Category_1 = require("./entities/Category");
const Post_1 = require("../posts/entities/Post");
const Comment_1 = require("../comments/entities/Comment");
let ForumsService = class ForumsService {
    constructor(em) {
        this.em = em;
    }
    async create(createForumDto) {
        const forum = this.em.create(Forum_1.Forum, createForumDto);
        await this.em.persist(forum).flush();
        return forum;
    }
    async findAll() {
        const forums = await this.em.find(Forum_1.Forum, {}, { populate: ['categories'], orderBy: { name: 'asc' } });
        await this.em.populate(forums, ['posts.createdAt'], {
            fields: ['posts.createdAt'],
        });
        return forums;
    }
    async findTrending() {
        const latestPosts = await this.em.find(Post_1.Post, {}, {
            populate: ['postLikes.user', 'category', 'comments', 'user', 'forum'],
            orderBy: { createdAt: 'desc' },
            limit: 3,
        });
        const latestComments = await this.em.find(Comment_1.Comment, {}, {
            populate: ['user', 'post.forum'],
            orderBy: { createdAt: 'desc' },
            limit: 3,
        });
        return { latestPosts, latestComments };
    }
    async findOne(id) {
        return await this.em.findOne(Forum_1.Forum, { id: id }, {
            populate: [
                'categories',
                'posts',
                'posts.postLikes',
                'posts.category',
                'posts.forum',
                'posts.user',
                'posts.comments',
            ],
        });
    }
    async findOneForEdit(id) {
        return await this.em.findOne(Forum_1.Forum, { id: id }, { populate: ['categories'] });
    }
    async update(id, updateForumDto) {
        const forum = this.em.getReference(Forum_1.Forum, id);
        updateForumDto.deletedCategories.forEach((c) => {
            const category = this.em.getReference(Category_1.Category, c.id);
            this.em.remove(category);
        });
        updateForumDto.addedCategories.forEach((c) => {
            const category = this.em.create(Category_1.Category, c);
            category.forum = forum;
            this.em.persist(category);
        });
        forum.name = updateForumDto.name;
        await this.em.flush();
        return forum;
    }
    async remove(id) {
        const ref = this.em.getReference(Forum_1.Forum, id);
        this.em.remove(ref);
        await this.em.flush();
        return ref;
    }
};
exports.ForumsService = ForumsService;
exports.ForumsService = ForumsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], ForumsService);
//# sourceMappingURL=forums.service.js.map