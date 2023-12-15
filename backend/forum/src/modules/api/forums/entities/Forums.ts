import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Categories } from './Categories';
import { Posts } from '../../posts/entities/Posts';

@Entity()
export class Forums {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @OneToMany(() => Categories, (category) => category.forum)
  categories? = new Collection<Categories>(this);

  @OneToMany(() => Posts, (post) => post.forum)
  posts? = new Collection<Posts>(this);
}
