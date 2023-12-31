-- migrate:up
create table posts (
    id serial primary key,
    title varchar(32) not null,
    content varchar not null,
    created_at timestamp default current_timestamp,
    category_id integer references categories(id) on delete set null,
    user_id integer references users(id) on delete set null,
    forum_id integer references forums(id) on delete cascade,
    likes integer default 0
);

-- migrate:down
drop table posts;
