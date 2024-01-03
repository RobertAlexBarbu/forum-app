import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
import { EntityManager } from '@mikro-orm/core';
import { Forum } from './entities/Forum';
import { Post } from '../posts/entities/Post';
import { Comment } from '../comments/entities/Comment';
export declare class ForumsService {
    private readonly em;
    constructor(em: EntityManager);
    create(createForumDto: CreateForumDto): Promise<Forum>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<Forum, "categories">[]>;
    findTrending(): Promise<{
        latestPosts: import("@mikro-orm/core").Loaded<Post, "user" | "forum" | "comments" | "category" | "postLikes.user">[];
        latestComments: import("@mikro-orm/core").Loaded<Comment, "user" | "post.forum">[];
    }>;
    findOne(id: number): Promise<import("@mikro-orm/core").Loaded<Forum, "categories" | "posts" | "posts.postLikes" | "posts.category" | "posts.forum" | "posts.user" | "posts.comments">>;
    findOneForEdit(id: number): Promise<import("@mikro-orm/core").Loaded<Forum, "categories">>;
    update(id: number, updateForumDto: UpdateForumDto): Promise<Forum>;
    remove(id: number): Promise<Forum>;
}
