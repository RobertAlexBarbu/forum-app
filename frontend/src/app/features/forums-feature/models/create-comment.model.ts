export interface CreateCommentModel {
  username?: string,
  content: string,
  post_id: number,
  created_at?: string,
}
