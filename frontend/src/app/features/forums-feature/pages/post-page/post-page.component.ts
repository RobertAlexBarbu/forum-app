import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostsService} from "../../services/posts/posts.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TimeAgoPipe} from "../../../../shared/pipes/time-ago.pipe";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {
  jamArrowSquareUp,
  jamArrowSquareUpF,
  jamMessageWritingF
} from "@ng-icons/jam-icons";
import {Store} from "@ngrx/store";
import {BehaviorSubject, Subject} from "rxjs";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {CommentComponent} from "../../components/comment/comment.component";
import {PostModel} from "../../models/post.model";

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [CommonModule, RouterLink, TimeAgoPipe, NgIcon, InputTextareaModule, PaginatorModule, ReactiveFormsModule, ButtonModule, CommentComponent],
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({
    jamArrowSquareUp,
    jamArrowSquareUpF,
    jamMessageWritingF
  })]
})
export class PostPageComponent implements OnInit {

  ngOnInit() {
    this.postsService.getPost(this.route.snapshot.params['post']).subscribe({
      next: (data) => {
        this.post = data;
        this.post$.next(data);
        this.store.select('auth').subscribe({
          next: (data) => {
            this.userId = data.id;
            this.username = data.username;
            if (this.post) {
              if (this.post.postLikes.find((like) => {
                return like.user.id == this.userId;
              })) {
                this.liked = true;
              }
              this.likes = this.post.postLikes.length;
              this.likes$.next(this.post.postLikes.length);
            }
          }
        })
      }
    })
  }

  postsService = inject(PostsService);
  route = inject(ActivatedRoute);
  post$ = new Subject<PostModel>()
  post!: PostModel;
  userId!: number;
  username!: string;
  store = inject(Store);
  liked = false;
  likes = 0;
  likes$ = new BehaviorSubject<number>(0);
  comment = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });

  likePost(id: number) {
    this.postsService.likePost(id).subscribe();
    this.likes += 1;
    this.likes$.next(this.likes);
    this.liked = true
  }

  dislikePost(id: number) {
    this.likes -= 1;
    this.likes$.next(this.likes);
    this.postsService.dislikePost(id).subscribe();
    this.liked = false;
  }

  onSubmit() {
    if (this.comment.valid && this.post) {
      this.postsService.commentPost({
        userId: 77,
        postId: this.post.id,
        content: this.comment.getRawValue()
      }).subscribe({
        next: (data) => {

          data.user.username = this.username;
          if (Array.isArray(this.post?.comments) && this.post) {
            this.post?.comments.push(data);
            this.post$.next(this.post);
          }
        }
      })
    }
  }


}
