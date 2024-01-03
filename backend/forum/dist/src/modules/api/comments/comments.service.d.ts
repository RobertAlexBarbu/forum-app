import { CreateCommentDto } from './dto/create-comment.dto';
import { EntityManager } from '@mikro-orm/core';
import { Comment } from './entities/Comment';
import { EmailService } from '../../global/email/email.service';
export declare class CommentsService {
    private readonly em;
    private readonly emailService;
    constructor(em: EntityManager, emailService: EmailService);
    create(createCommentDto: CreateCommentDto, userId: string, username: string): Promise<import("@mikro-orm/core").EntityDTO<import("@mikro-orm/core").Loaded<Comment, never>>>;
    remove(id: number): Promise<Comment>;
}
