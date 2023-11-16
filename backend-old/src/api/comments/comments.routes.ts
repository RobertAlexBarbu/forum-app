import express from "express";
import {isLoggedInMiddleware} from "../../middleware/is-logged-in.middleware";
import {CommentsService} from "./comments.service";

export const commentsRoutes = express.Router();
commentsRoutes.post('', isLoggedInMiddleware, CommentsService.createComment)