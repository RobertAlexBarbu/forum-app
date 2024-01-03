import { ForumsService } from './forums.service';
import { CreateForumDto } from './dto/create-forum.dto';
import { UpdateForumDto } from './dto/update-forum.dto';
export declare class ForumsController {
    private readonly forumsService;
    constructor(forumsService: ForumsService);
    create(createForumDto: CreateForumDto): Promise<import("./entities/Forum").Forum>;
    findAll(): Promise<import("@mikro-orm/core").Loaded<import("./entities/Forum").Forum, "categories">[]>;
    findTrending(): Promise<{
        latestPosts: import("@mikro-orm/core").Loaded<import("../posts/entities/Post").Post, "user" | "forum" | "comments" | "category" | "postLikes.user">[];
        latestComments: import("@mikro-orm/core").Loaded<import("../comments/entities/Comment").Comment, "user" | "post.forum">[];
    }>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/Forum").Forum, "categories" | "posts" | "posts.postLikes" | "posts.category" | "posts.forum" | "posts.user" | "posts.comments">>;
    findOneForEdit(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/Forum").Forum, "categories">>;
    update(id: string, updateForumDto: UpdateForumDto): Promise<import("./entities/Forum").Forum>;
    remove(id: string): Promise<import("./entities/Forum").Forum>;
}
