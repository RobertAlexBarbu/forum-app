import { Post } from './Post';
import { User } from '../../users/entities/User';
export declare class PostLike {
    id: number;
    user?: User;
    post?: Post;
}
