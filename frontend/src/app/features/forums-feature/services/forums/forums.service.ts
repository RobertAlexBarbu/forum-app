import { inject, Injectable } from '@angular/core';
import { HttpService } from '../../../../core/services/http/http.service';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ForumModel } from '../../models/forum.model';
import { CreateForumDto } from '../../dto/create-forum.dto';
import { UpdateForumDto } from '../../dto/update-forum.dto';
import { PostModel } from '../../models/post.model';
import { CommentModel } from '../../models/comment.model';

@Injectable()
export class ForumsService {
  http = inject(HttpService);

  createForum(forum: CreateForumDto) {
    return this.http.post<ForumModel, CreateForumDto>('forums', forum).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('⚠ ' + error.statusText));
      })
    );
  }

  getForums() {
    return this.http.get<ForumModel[]>('forums');
  }

  getForum(id: number) {
    return this.http.getByID<ForumModel>('forums', id);
  }
  getForumWithTopPosts(id: number) {
    return this.http.getByID<ForumModel>('forums/top', id);
  }

  getForumByName(name: string) {
    return this.http.getByID<ForumModel>('forums', name);
  }

  getForumForEdit(id: number) {
    return this.http.getByID<ForumModel>('forums/edit', id);
  }

  updateForum(id: number, body: UpdateForumDto) {
    return this.http.putByID('forums', body, id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('⚠ ' + error.statusText));
      })
    );
  }

  deleteForum(id: number) {
    return this.http.deleteByID('forums', id).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error('⚠ ' + error.statusText));
      })
    );
  }
}
