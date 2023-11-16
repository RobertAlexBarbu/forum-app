import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Roles } from './Roles';

@Entity()
export class Users {
  @PrimaryKey()
  id!: number;

  @Unique({ name: 'users_username_key' })
  @Property({ length: 32, nullable: true })
  username?: string;

  @Unique({ name: 'users_email_key' })
  @Property({ length: 64, nullable: true })
  email?: string;

  @Property({ nullable: true })
  passwordHash?: string;

  @Property({ nullable: true })
  passwordSalt?: string;

  @Property({ length: 6, nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @ManyToOne({ entity: () => Roles, onDelete: 'set null', nullable: true })
  role?: Roles;
}
