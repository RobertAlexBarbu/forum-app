import {JsonObject} from "type-fest";

export interface CreatePostModel extends JsonObject {
  title: string,
  content: string,
  category_id: number | null,
  forum_id: number
}
