import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Posts } from '../../posts/entities/Posts';
import { User } from '../../users/entities/User';

@Entity()
export class Comments {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => User, onDelete: 'set null', nullable: true })
  user?: User;

  @Property({ length: 256 })
  content!: string;

  @ManyToOne({ entity: () => Posts, onDelete: 'cascade', nullable: true })
  post?: Posts;

  @Property()
  createdAt?: Date = new Date();
}
