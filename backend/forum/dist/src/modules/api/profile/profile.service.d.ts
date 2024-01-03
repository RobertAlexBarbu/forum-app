import { EntityManager } from '@mikro-orm/core';
import { User } from '../users/entities/User';
import { Post } from '../posts/entities/Post';
export declare class ProfileService {
    private readonly em;
    constructor(em: EntityManager);
    findOne(username: string): Promise<{
        user: import("@mikro-orm/core").EntityDTO<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Loaded<User, "role">, never>>;
        posts: import("@mikro-orm/core").Loaded<Post, "user" | "forum" | "comments" | "category" | "postLikes">[];
    }>;
}
