-- migrate:up
create table post_likes (
    id serial primary key,
    user_id integer references users(id) on delete cascade,
    post_id integer references posts(id) on delete cascade
);

-- migrate:down
drop table post_likes;
