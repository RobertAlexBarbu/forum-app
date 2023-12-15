import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Forums } from './Forums';
import { Posts } from '../../posts/entities/Posts';

@Entity()
export class Categories {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @ManyToOne()
  forum?: Forums;

  @OneToMany(() => Posts, (post) => post.category)
  posts? = new Collection<Posts>(this);
}
