-- migrate:up
create table forums (
    id serial primary key,
    name varchar(32) not null
)

-- migrate:down
drop table forums;
