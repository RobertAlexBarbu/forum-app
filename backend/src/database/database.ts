import {knex} from "knex";

export const database = knex({
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
});