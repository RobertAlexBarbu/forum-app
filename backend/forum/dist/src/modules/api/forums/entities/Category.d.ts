import { Collection } from '@mikro-orm/core';
import { Forum } from './Forum';
import { Post } from '../../posts/entities/Post';
export declare class Category {
    id: number;
    name: string;
    forum?: Forum;
    posts?: Collection<Post, object>;
}
