import {CategoryModel} from "./forum-with-categories.model";

export interface PostModel {
  id: number,
  title: string,
  likes: {post_id:number, user_id:number, id:number}[],
  category: CategoryModel | null
  comments: number,
  user_id: number,
  category_id: number,
  created_at: string,
  created_by: string
}
