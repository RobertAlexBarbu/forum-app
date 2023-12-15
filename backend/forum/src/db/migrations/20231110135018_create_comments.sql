-- migrate:up
create table comment (
    id serial primary key,
    app_user_id varchar references app_user(uid) on delete set null,
    content text not null,
    post_id integer references post(id) on delete cascade,
    created_at timestamp default current_timestamp
);

-- migrate:down
drop table comment;
