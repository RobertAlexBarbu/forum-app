import {PostsRepository} from "./posts.repository";
import {NextFunction, Request, Response} from "express";

export class PostsService {
  private static readonly postsRepository = new PostsRepository();
  static createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.postsRepository.createPost(req.body);
      res.send();
    } catch(err) {
      next(err)
    }
  }
}