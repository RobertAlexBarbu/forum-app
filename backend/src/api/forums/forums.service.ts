import {NextFunction, Request, Response} from "express";
import {ForumsRepository} from "./forums.repository";

export class ForumsService {
  static forumsRepository = new ForumsRepository();

  static async createForum(
    req: Request,
    res: Response,
    next: NextFunction) {
    try {
      const forum = await this.forumsRepository.insertForum(req.body);
      res.send(forum)
    } catch (err) {
      next(err);
    }
  }

  static async getForums(req: Request, res: Response, next: NextFunction) {
    try {
      const forums = await this.forumsRepository.getForums();
      res.send(forums);
    } catch(err) {
      next(err);
    }

  }
}