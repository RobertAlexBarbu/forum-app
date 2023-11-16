-- migrate:up
create table comments (
    id serial primary key,
    user_id integer references users(id) on delete set null,
    content varchar(256) not null,
    post_id integer references posts(id) on delete cascade,
    created_at timestamp default current_timestamp
);

-- migrate:down
drop table comments;
