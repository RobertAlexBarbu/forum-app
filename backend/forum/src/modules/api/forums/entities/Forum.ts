import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Category } from './Category';
import { Post } from '../../posts/entities/Post';

@Entity()
export class Forum {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToMany(() => Category, (category) => category.forum)
  categories? = new Collection<Category>(this);

  @OneToMany(() => Post, (post) => post.forum)
  posts? = new Collection<Post>(this);
}
