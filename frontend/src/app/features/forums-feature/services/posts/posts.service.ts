import {inject, Injectable} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {CreatePostModel} from "../../models/create-post.model";
import {PostModel} from "../../models/post.model";
import {CreateCommentModel} from "../../models/create-comment.model";
import {Post2Model} from "../../models/post2.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  http = inject(HttpService);
  constructor() { }
  createPost(body: CreatePostModel) {
    return this.http.post('api/posts', body);
  }
  likePost(postId: number) {
    console.log(`liking post ${postId}`)
    return this.http.post(`api/posts/${postId}/like`);
  }
  dislikePost(postId: number) {
    return this.http.delete(`api/posts/${postId}/dislike`);
  }

  getPost(id: number) {
    return this.http.getByID<Post2Model>('api/posts', id);
  }

  commentPost(comment: CreateCommentModel) {
    return this.http.post('api/comments', comment);
  }
}
