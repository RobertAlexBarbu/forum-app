import { Post } from '../../posts/entities/Post';
import { User } from '../../users/entities/User';
export declare class Comment {
    id: number;
    user?: User;
    content: string;
    post?: Post;
    createdAt?: Date;
}
