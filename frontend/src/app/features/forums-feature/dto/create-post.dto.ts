export interface CreatePostDto {
  userId: number
  categoryId: number | null
  forumId: number
  title: string
  content: string
}
