import express from "express";
import {PostsService} from "./posts.service";

export const postsRoutes = express.Router();
postsRoutes.post('', PostsService.createPost);