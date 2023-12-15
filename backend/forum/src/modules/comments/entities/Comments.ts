import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Posts } from '../../posts/entities/Posts';
import { AppUser } from '../../users/entities/AppUser';

@Entity()
export class Comments {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => AppUser, onDelete: 'set null', nullable: true })
  user?: AppUser;

  @Property({ length: 256 })
  content!: string;

  @ManyToOne({ entity: () => Posts, onDelete: 'cascade', nullable: true })
  post?: Posts;

  @Property()
  createdAt?: Date = new Date();
}
