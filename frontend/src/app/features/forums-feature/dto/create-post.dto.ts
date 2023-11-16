export class CreatePostDto {
  userId!: number;
  categoryId: number;
  forumId: number;
  title: string;
  content: string;
}
