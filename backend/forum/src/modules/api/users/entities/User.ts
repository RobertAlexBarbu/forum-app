import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property, Ref,
} from '@mikro-orm/core';
import { Role } from './Role';

@Entity({tableName: "app_user"})
export class User {
  @PrimaryKey()
  uid!: string;

  @Property({nullable: true})
  pictureUid?: string;

  @Property({ nullable: true })
  username!: string;

  @Property({ nullable: true })
  email!: string;

  @Property({ nullable: true, defaultRaw: `CURRENT_TIMESTAMP` })
  createdAt?: Date;

  @ManyToOne({ entity: () => Role, ref: true, nullable: true })
  role?: Ref<Role>;
}
