import { Collection } from '@mikro-orm/core';
import { Category } from './Category';
import { Post } from '../../posts/entities/Post';
export declare class Forum {
    id: number;
    name: string;
    categories?: Collection<Category, object>;
    posts?: Collection<Post, object>;
}
