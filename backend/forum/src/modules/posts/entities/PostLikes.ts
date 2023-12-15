import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Posts } from './Posts';
import { AppUser } from '../../users/entities/AppUser';

@Entity()
export class PostLikes {
  @PrimaryKey()
  id!: number;

  @ManyToOne({ entity: () => AppUser, onDelete: 'cascade', nullable: true })
  user?: AppUser;

  @ManyToOne({ entity: () => Posts, onDelete: 'cascade', nullable: true })
  post?: Posts;
}
