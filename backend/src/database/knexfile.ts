import type { Knex } from "knex";

// Update with your config settings.

export const config: { [key: string]: Knex.Config } = {

  development: {
    client: "postgresql",
    connection: {
      database: "forum",
      user: "postgres",
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
