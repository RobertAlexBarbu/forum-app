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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@mikro-orm/core");
const Post_1 = require("./entities/Post");
const User_1 = require("../users/entities/User");
const PostLike_1 = require("./entities/PostLike");
const Category_1 = require("../forums/entities/Category");
let PostsService = class PostsService {
    constructor(em) {
        this.em = em;
    }
    async create(createPostDto, userId) {
        const user = this.em.getReference(User_1.User, userId);
        const post = this.em.create(Post_1.Post, {
            user: user,
            content: createPostDto.content,
            title: createPostDto.title,
            category: createPostDto.categoryId,
            forum: createPostDto.forumId,
            createdAt: new Date(),
        });
        this.em.persist(post);
        await this.em.flush();
        return post;
    }
    async findAllByForum(id) {
        const posts = await this.em.find(Post_1.Post, { forum: id }, {
            populate: ['postLikes.user', 'category'],
            orderBy: { createdAt: 'desc' },
        });
        await this.em.populate(posts, ['comments'], {
            fields: ['comments.createdAt'],
        });
        return posts;
    }
    async findOne(id) {
        return await this.em.findOne(Post_1.Post, id, {
            populate: [
                'postLikes.user',
                'comments.user',
                'category',
                'user',
                'forum.categories',
            ],
            fields: [
                'user.username',
                'user.email',
                'comments',
                'category',
                'title',
                'createdAt',
                'content',
                'postLikes',
                'postLikes.user.id',
                'postLikes.user.username',
                'forum',
            ],
        });
    }
    async likePost(id, userId) {
        const like = this.em.create(PostLike_1.PostLike, { post: id, user: userId });
        this.em.persist(like);
        await this.em.flush();
        return like;
    }
    async dislikePost(id, userId) {
        const like = await this.em.find(PostLike_1.PostLike, { post: id, user: userId });
        this.em.remove(like);
        await this.em.flush();
        return like;
    }
    async update(id, updatePostDto) {
        const post = await this.em.findOne(Post_1.Post, id);
        if (updatePostDto.categoryId === null) {
            post.category = null;
        }
        else {
            post.category = this.em.getReference(Category_1.Category, updatePostDto.categoryId);
        }
        post.content = updatePostDto.content;
        post.title = updatePostDto.title;
        this.em.persist(post);
        await this.em.flush();
        return post;
    }
    async remove(id) {
        const post = this.em.getReference(Post_1.Post, id);
        this.em.remove(post);
        await this.em.flush();
        return post;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.EntityManager])
], PostsService);
//# sourceMappingURL=posts.service.js.map