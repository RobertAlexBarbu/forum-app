import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Posts } from '../../posts/entities/Posts';
import { Users } from '../../users/entities/Users';

@Entity()
export class Comments {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => Users, onDelete: 'set null', nullable: true })
  user?: Users;

  @Property({ length: 256 })
  content!: string;

  @ManyToOne({ entity: () => Posts, onDelete: 'cascade', nullable: true })
  post?: Posts;

  @Property()
  createdAt?: Date = new Date();
}
