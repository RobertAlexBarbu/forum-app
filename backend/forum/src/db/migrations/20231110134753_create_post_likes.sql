-- migrate:up
create table post_like (
    id serial primary key,
    app_user_id varchar references app_user(uid) on delete cascade,
    post_id integer references post(id) on delete cascade
);

-- migrate:down
drop table post_like;
