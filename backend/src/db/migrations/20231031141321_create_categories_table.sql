-- migrate:up
create table categories (
    id serial primary key ,
    name varchar(16) not null,
    color varchar(7),
    forum_id integer references forums(id) on delete cascade
);

-- migrate:down
drop table categories;
