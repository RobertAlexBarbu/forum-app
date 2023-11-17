import {
  ChangeDetectionStrategy,
  Component, inject,
  Input, OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostModel} from "../../models/post.model";
import {TimeAgoPipe} from "../../../../shared/pipes/time-ago.pipe";
import {RouterLink} from "@angular/router";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {
  jamArrowSquareUp,
  jamArrowSquareUpF,
  jamMessageWritingF
} from "@ng-icons/jam-icons";
import {PostsService} from "../../services/posts/posts.service";
import {BehaviorSubject} from "rxjs";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe, RouterLink, NgIcon],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [TimeAgoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({jamArrowSquareUp, jamArrowSquareUpF, jamMessageWritingF})]
})
export class PostComponent implements OnInit{
  _post!: PostModel;
  store = inject(Store);
  userId!:number;
  @Input()
  set post(value: PostModel) {
    this._post = value;
  };
  get post() {
    return this._post;
  }
  postsService = inject(PostsService);
  liked = false;
  likes = 0;
  likes$ = new BehaviorSubject<number>(0);
  likePost() {
    this.postsService.likePost(this.post.id).subscribe();
    this.likes += 1;
    this.likes$.next(this.likes);
    this.liked = true
  }
  dislikePost() {
    this.likes -= 1;
    this.likes$.next(this.likes);
    this.postsService.dislikePost(this.post.id).subscribe();
    this.liked = false;
  }
  ngOnInit() {
    this.store.select('auth').subscribe({
      next: (data) => {
        this.userId = data.id;
        if(this.post.postLikes.find((like) => {
          return like.user.id == this.userId;
        })) {
          this.liked = true;
        }
        this.likes = this.post.postLikes.length;
        this.likes$.next(this.post.postLikes.length);
    }
    })
  }
}
