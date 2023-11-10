import express from "express";
import {PostsService} from "./posts.service";
import {isLoggedInMiddleware} from "../../middleware/is-logged-in.middleware";

export const postsRoutes = express.Router();
postsRoutes.post('', isLoggedInMiddleware, PostsService.createPost);
postsRoutes.post('/:id/like', isLoggedInMiddleware, PostsService.likePost);
postsRoutes.delete('/:id/dislike', isLoggedInMiddleware, PostsService.dislikePost);