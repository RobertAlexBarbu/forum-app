import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentDto: CreateCommentDto, req: any): Promise<import("@mikro-orm/core").EntityDTO<import("@mikro-orm/core").Loaded<import("./entities/Comment").Comment, never>>>;
    remove(id: string): Promise<import("./entities/Comment").Comment>;
}
