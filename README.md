# Forumly
A Web Forum with Admins and Users\
[forumly.xyz](https://forumly.xyz/home)

## Features
#### Signup / Login / Logout using Firebase Auth
#### Admins:
  - do everything a User does
  - create/edit/delete Forums
  - promote/demote other admins
  - delete any post/comment
#### Users:
  - upload profile picture using Firebase Cloud Storage
  - create/edit posts
  - create comments
  #### An email is sent to an user when one of it's posts receives it's first comment using EmailJS

## Implementation Details
* Frontend: Angular + Angularfire + Primeng + NgRx ( For AuthState )
* Backend: NestJS + Firebase Admin SDK + MikroORM
* Database: Postgres

## Admin Account
* email: admin@forumly.xyz
* password: admin1234A