import { ProfileService } from './profile.service';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    findOne(username: string): Promise<{
        user: import("@mikro-orm/core").EntityDTO<import("@mikro-orm/core").Loaded<import("@mikro-orm/core").Loaded<import("../users/entities/User").User, "role">, never>>;
        posts: import("@mikro-orm/core").Loaded<import("../posts/entities/Post").Post, "user" | "forum" | "comments" | "category" | "postLikes">[];
    }>;
}
