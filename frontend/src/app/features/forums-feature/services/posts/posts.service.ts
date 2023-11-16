import {inject, Injectable} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {PostModel} from "../../models/post.model";
import {CreateCommentDto} from "../../dto/create-comment.dto";
import {CreatePostDto} from "../../dto/create-post.dto";
import {CommentModel} from "../../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  http = inject(HttpService);
  constructor() { }
  createPost(body: CreatePostDto) {
    return this.http.post('posts', body);
  }
  likePost(postId: number) {
    return this.http.post(`api/posts/${postId}/like`);
  }
  dislikePost(postId: number) {
    return this.http.delete(`api/posts/${postId}/dislike`);
  }

  getPost(id: number) {
    return this.http.getByID<PostModel>('posts', id);
  }

  commentPost(comment: CreateCommentDto) {
    return this.http.post<CommentModel>('comments', comment);
  }
}
