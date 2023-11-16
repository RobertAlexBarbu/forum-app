import {PostsRepository} from "./posts.repository";
import {NextFunction, Request, Response} from "express";
import {UserModel} from "../users/model/user.model";

export class PostsService {
  private static readonly postsRepository = new PostsRepository();
  static createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as UserModel;
      await this.postsRepository.createPost(req.body, user.id);
      res.send();
    } catch(err) {
      next(err)
    }
  }
  static likePost = async  (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as UserModel;
      await this.postsRepository.likePost(req.params.id, user.id);
      res.send();
    } catch(err) {
      next(err);
    }
  }
  static dislikePost = async  (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user as UserModel;
      await this.postsRepository.dislikePost(req.params.id, user.id);
      res.send();
    } catch(err) {
      next(err);
    }
  }
  static getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postsRepository.getPost(req.params.id);
      res.send(post);
    } catch(err) {
      next(err);
    }
  }
}