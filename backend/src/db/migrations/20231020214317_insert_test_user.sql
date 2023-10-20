-- migrate:up
insert into users (username, email, password_hash, password_salt)
VALUES
    ('testUser', 'testEmail', 'testPasswordHash', 'testPasswordSalt');

-- migrate:down
delete from users where username = 'testUser';
