import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, req: any): Promise<import("./entities/Post").Post>;
    findAllByForum(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/Post").Post, "category" | "postLikes.user">[]>;
    findOne(id: string): Promise<import("@mikro-orm/core").Loaded<import("./entities/Post").Post, "user" | "forum" | "createdAt" | "comments" | "title" | "content" | "category" | "postLikes" | "postLikes.user" | "comments.user" | "forum.categories" | "user.username" | "user.email" | "postLikes.user.id" | "postLikes.user.username">>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/Post").Post, never>>;
    remove(id: string): Promise<import("./entities/Post").Post>;
    likePost(id: string, req: any): Promise<import("./entities/PostLike").PostLike>;
    dislikePost(id: string, req: any): Promise<import("@mikro-orm/core").Loaded<import("./entities/PostLike").PostLike, never>[]>;
}
