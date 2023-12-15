import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Categories } from '../../forums/entities/Categories';
import { Forums } from '../../forums/entities/Forums';
import { AppUser } from '../../users/entities/AppUser';
import { PostLikes } from './PostLikes';
import { Comments } from '../../comments/entities/Comments';

@Entity()
export class Posts {
  @PrimaryKey()
  id!: number;

  @Property({ length: 32 })
  title!: string;

  @Property()
  content!: string;

  @Property()
  createdAt?: Date = new Date();

  @ManyToOne({ entity: () => Categories, onDelete: 'set null', nullable: true })
  category?: Categories;

  @ManyToOne({ entity: () => AppUser, onDelete: 'set null', nullable: true })
  user?: AppUser;

  @ManyToOne({ entity: () => Forums, onDelete: 'cascade', nullable: true })
  forum?: Forums;

  @OneToMany(() => PostLikes, (postLike) => postLike.post)
  postLikes? = new Collection<PostLikes>(this);

  @OneToMany(() => Comments, (comment) => comment.post)
  comments? = new Collection<Comments>(this);
}
