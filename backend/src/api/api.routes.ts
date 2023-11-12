import express from "express";
import {authRoutes} from "./auth/auth.routes";
import {forumsRoutes} from "./forums/forums.routes";
import {usersRoutes} from "./users/users.routes";
import {postsRoutes} from "./posts/posts.routes";
import {commentsRoutes} from "./comments/comments.routes";


export const apiRoutes = express.Router();
apiRoutes
  .use('/auth', authRoutes)
  .use('/forums', forumsRoutes)
  .use('/users', usersRoutes)
  .use('/posts', postsRoutes)
  .use('/comments', commentsRoutes)

