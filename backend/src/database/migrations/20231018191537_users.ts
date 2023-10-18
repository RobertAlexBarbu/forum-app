import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.raw(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR UNIQUE NOT NULL,
            password_hash VARCHAR NOT NULL,
            salt VARCHAR NOT NULL
        )
    `)
}


export async function down(knex: Knex): Promise<void> {
    return knex.raw(`
        DROP TABLE users
    `)
}

