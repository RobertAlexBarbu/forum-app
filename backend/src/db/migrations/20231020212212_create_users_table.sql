-- migrate:up
create table users (
    id serial primary key,
    username varchar(32) unique,
    email varchar(64) unique,
    password_hash varchar,
    password_salt varchar,
    created_at timestamp default current_timestamp
)

-- migrate:down
drop table users
