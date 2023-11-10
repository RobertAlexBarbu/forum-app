import express from "express";
import {ForumsService} from "./forums.service";
import {isAdminMiddleware} from "../../middleware/is-admin.middleware";

export const forumsRoutes = express.Router();
forumsRoutes.delete('/:id', ForumsService.deleteForum)
forumsRoutes.post('/new', isAdminMiddleware ,ForumsService.createForum)
forumsRoutes.get('', ForumsService.getForums)
forumsRoutes.get('/edit/:id', ForumsService.getForumWithCategories)
forumsRoutes.put('/edit/:id', ForumsService.editForum)
forumsRoutes.get('/:id', ForumsService.getForum)
