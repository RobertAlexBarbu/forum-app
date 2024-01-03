import { Collection } from '@mikro-orm/core';
import { Category } from '../../forums/entities/Category';
import { Forum } from '../../forums/entities/Forum';
import { User } from '../../users/entities/User';
import { PostLike } from './PostLike';
import { Comment } from '../../comments/entities/Comment';
export declare class Post {
    id: number;
    title: string;
    content: string;
    createdAt?: Date;
    category?: Category;
    user?: User;
    forum?: Forum;
    postLikes?: Collection<PostLike, object>;
    comments?: Collection<Comment, object>;
}
