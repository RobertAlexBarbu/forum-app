import {JsonObject} from "type-fest";

export interface EditForumModel extends JsonObject {
  name: string,
  id: number,
  addedCategories: {name: string, forum_id: number}[],
  deletedCategoriesIds: number[]
}

