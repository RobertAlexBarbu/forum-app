import {inject, Injectable} from '@angular/core';
import {HttpService} from "../../../core/services/http/http.service";
import {catchError, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ForumModel} from "../models/forum.model";

@Injectable({
  providedIn: 'root'
})
export class ForumsService {
  http = inject(HttpService);
  saveForum(forumName: string) {
    return this.http.post('api/forums/new', {name: forumName}).pipe(catchError((error: HttpErrorResponse) => {
      return throwError(() => new Error('⚠ ' + error.statusText));
    }));
  }
  getForums() {
    return this.http.get<ForumModel[]>('api/forums');
  }
  constructor() { }
}
