-- migrate:up
alter table users
drop constraint users_username_key;
alter table users
drop constraint users_email_key;

-- migrate:down
alter table users
add unique(username), unique(email);
