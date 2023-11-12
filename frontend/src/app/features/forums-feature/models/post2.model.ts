import {CategoryModel} from "./forum-with-categories.model";
import {CreateCommentModel} from "./create-comment.model";

export interface Post2Model {
  id: number,
  title: string,
  likes: {post_id:number, user_id:number, id:number}[],
  category: CategoryModel | null
  comments: CreateCommentModel[],
  user_id: number,
  category_id: number,
  created_at: string,
  created_by: string,
  content: string
}
