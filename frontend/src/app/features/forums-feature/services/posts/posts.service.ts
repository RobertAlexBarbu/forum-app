import {inject, Injectable} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {PostModel} from "../../models/post.model";
import {CreateCommentDto} from "../../dto/create-comment.dto";
import {CreatePostDto} from "../../dto/create-post.dto";
import {CommentModel} from "../../models/comment.model";
import {PostLike} from "../../models/post-like.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  http = inject(HttpService);
  constructor() { }
  createPost(body: CreatePostDto) {
    return this.http.post('posts', body);
  }
  deletePost(id: number) {
    return this.http.deleteByID<PostModel>('posts', id)
  }
  likePost(postId: number) {
    return this.http.post<PostLike>(`posts/likes/${postId}`);
  }
  dislikePost(postId: number) {
    return this.http.delete<PostLike>(`posts/likes/${postId}`);
  }
  getPost(id: number) {
    return this.http.getByID<PostModel>('posts', id);
  }

  commentPost(comment: CreateCommentDto) {
    return this.http.post<CommentModel>('comments', comment);
  }
  deleteComment(id: number) {
    return this.http.deleteByID<CommentModel>('comments', id);
  }
}
