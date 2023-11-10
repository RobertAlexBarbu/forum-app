
import {CategoryModel} from "./forum-with-categories.model";
import {PostModel} from "./post.model";

export interface ForumWithPostsModel {
  id: number,
  name: string,
  categories: CategoryModel[],
  posts: PostModel[]
}
