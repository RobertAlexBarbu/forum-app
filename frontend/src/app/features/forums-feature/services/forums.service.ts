import {inject, Injectable} from '@angular/core';
import {HttpService} from "../../../core/services/http/http.service";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ForumModel} from "../models/forum.model";
import {ForumWithCategoriesModel} from "../models/forum-with-categories.model";
import {EditForumModel} from "../models/edit-forum.model";

@Injectable({
  providedIn: 'root'
})
export class ForumsService {
  http = inject(HttpService);
  saveForum(forumName: string) {
    return this.http.post<ForumModel>('api/forums/new', {name: forumName}).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error('⚠ ' + error.statusText));
    }));
  }
  getForums() {
    return this.http.get<ForumModel[]>('api/forums');
  }
  deleteForum(id: number) {
    return this.http.deleteByID('api/forums', id).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error('⚠ ' + error.statusText));
    }));
  }
  getForumWithCategories(id: number) {
    return this.http.getByID<ForumWithCategoriesModel>('api/forums/edit', id);
  }
  editForum(id: number, body: EditForumModel) {
    return this.http.putByID('api/forums/edit', body, id).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error('⚠ ' + error.statusText));
    }));
  }
  constructor() { }
}
