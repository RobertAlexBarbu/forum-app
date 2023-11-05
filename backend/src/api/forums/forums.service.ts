import {NextFunction, Request, Response} from "express";
import {ForumsRepository} from "./forums.repository";

export class ForumsService {

  private static readonly forumsRepository = new ForumsRepository();

  static createForum = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      const forum = await this.forumsRepository.insertForum(req.body);
      res.send(forum)
    } catch (err) {
      next(err);
    }
  }

  static getForums = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const forums = await this.forumsRepository.getForums();
      res.send(forums);
    } catch(err) {
      next(err);
    }

  }

  static deleteForum = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.forumsRepository.deleteForum(req.params.id);
    } catch(err) {
      next(err);
    }
  }
}