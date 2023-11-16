import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Posts } from './Posts';
import { Users } from '../../users/entities/Users';

@Entity()
export class PostLikes {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => Users, onDelete: 'cascade', nullable: true })
  user?: Users;

  @ManyToOne({ entity: () => Posts, onDelete: 'cascade', nullable: true })
  post?: Posts;
}
