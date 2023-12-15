import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Posts } from './Posts';
import { User } from '../../users/entities/User';

@Entity()
export class PostLikes {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => User, onDelete: 'cascade', nullable: true })
  user?: User;

  @ManyToOne({ entity: () => Posts, onDelete: 'cascade', nullable: true })
  post?: Posts;
}
