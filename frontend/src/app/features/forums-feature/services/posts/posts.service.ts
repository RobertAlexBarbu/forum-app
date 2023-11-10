import {inject, Injectable} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {CreatePostModel} from "../../models/create-post.model";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  http = inject(HttpService);
  constructor() { }
  createPost(body: CreatePostModel) {
    return this.http.post('api/posts', body);
  }
}
