-- migrate:up
create table roles (
    id serial primary key ,
    role varchar(32) not null unique
);
insert into roles (role)
values ('user'), ('admin'), ('moderator');

-- migrate:down
drop table roles;
