import express from "express";
import {ForumsService} from "./forums.service";
import {isAdminMiddleware} from "../../middleware/is-admin.middleware";

export const forumsRoutes = express.Router();
forumsRoutes.post('/new', isAdminMiddleware ,ForumsService.createForum)
forumsRoutes.get('', ForumsService.getForums)