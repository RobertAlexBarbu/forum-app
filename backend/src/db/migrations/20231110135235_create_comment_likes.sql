-- migrate:up
create table comment_likes (
    id      serial primary key,
    user_id integer references users(id) on delete cascade,
    comment_id integer references comments(id) on delete cascade
);

-- migrate:down
drop table comment_likes;
