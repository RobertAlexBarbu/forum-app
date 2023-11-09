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
  static getForumWithCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('hey');
      const forums = await this.forumsRepository.getForumWithCategories(req.params.id)
      res.send(forums)
    } catch(err) {
      next(err)
    }
  }
  static deleteForum = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.forumsRepository.deleteForum(req.params.id);
      res.send(result);
    } catch(err) {
      next(err);
    }
  }
  static editForum = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      await this.forumsRepository.editForum(req.params.id, req.body);
      res.send();
    } catch(err) {
      next(err)
    }
  }
}