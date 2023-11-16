import {inject, Injectable} from '@angular/core';
import {HttpService} from "../../../../core/services/http/http.service";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ForumModel} from "../../models/forum.model";
import {CreateForumDto} from "../../dto/create-forum.dto";
import {UpdateForumDto} from "../../dto/update-forum.dto";

@Injectable({
  providedIn: 'root'
})
export class ForumsService {
  http = inject(HttpService);

  createForum(forum: CreateForumDto) {
    return this.http.post<ForumModel>('forums', forum).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error('⚠ ' + error.statusText));
    }));
  }

  getForums() {
    return this.http.get<ForumModel[]>('forums');
  }

  getForum(id: number) {
    return this.http.getByID<ForumModel>('forums', id);
  }
  getForumForEdit(id: number) {
    return this.http.getByID<ForumModel>('forums/edit', id);
  }

  updateForum(id: number, body: UpdateForumDto) {
    return this.http.patchByID('forums', body, id).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error('⚠ ' + error.statusText));
    }));
  }

  deleteForum(id: number) {
    return this.http.deleteByID('forums', id).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error('⚠ ' + error.statusText));
    }));
  }

  constructor() {
  }
}
