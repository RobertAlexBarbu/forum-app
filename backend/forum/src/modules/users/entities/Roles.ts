import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';

@Entity()
export class Roles {
  @PrimaryKey()
  id!: number;

  @Unique({ name: 'roles_role_key' })
  @Property({ length: 32 })
  role!: string;
}
