import {NextFunction, Request, Response} from "express";
import {ForumsRepository} from "./forums.repository";

export class ForumsService {

  private static readonly forumsRepository = new ForumsRepository();

  static createForum = async (
    req: Request,
    res: Response,
    next: NextFunction) => {
    try {
      console.log('test');
      const forum = await this.forumsRepository.insertForum(req.body);
      console.log('test2');
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
}