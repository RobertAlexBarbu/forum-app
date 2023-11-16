-- migrate:up
alter table users
add column role_id integer references roles(id) on delete set null;
update users set role_id = 1;


-- migrate:down
alter table users
drop column role_id
