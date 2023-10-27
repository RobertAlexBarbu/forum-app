export const dbConfig = {
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
}