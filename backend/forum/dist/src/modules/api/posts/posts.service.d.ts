import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { EntityManager } from '@mikro-orm/core';
import { Post } from './entities/Post';
import { PostLike } from './entities/PostLike';
export declare class PostsService {
    private readonly em;
    constructor(em: EntityManager);
    create(createPostDto: CreatePostDto, userId: string): Promise<Post>;
    findAllByForum(id: number): Promise<import("@mikro-orm/core").Loaded<Post, "category" | "postLikes.user">[]>;
    findOne(id: number): Promise<import("@mikro-orm/core").Loaded<Post, "user" | "forum" | "createdAt" | "comments" | "title" | "content" | "category" | "postLikes" | "postLikes.user" | "comments.user" | "forum.categories" | "user.username" | "user.email" | "postLikes.user.id" | "postLikes.user.username">>;
    likePost(id: number, userId: string): Promise<PostLike>;
    dislikePost(id: number, userId: string): Promise<import("@mikro-orm/core").Loaded<PostLike, never>[]>;
    update(id: number, updatePostDto: UpdatePostDto): Promise<import("@mikro-orm/core").Loaded<Post, never>>;
    remove(id: number): Promise<Post>;
}
