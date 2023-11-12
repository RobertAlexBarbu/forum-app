import {CommentsRepository} from "./comments.repository";
import express, {NextFunction} from "express";
import {UserModel} from "../users/model/user.model";

export class CommentsService {
  private static readonly commentsRepository = new CommentsRepository();
  static createComment = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
      const user = req.user as UserModel;
      const comment = await this.commentsRepository.createComment(user.id, req.body)
      res.send(comment);
    } catch(err) {
      next(err);
    }
  }
}