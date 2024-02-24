import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumsService } from '../../services/forums/forums.service';
import { PostComponent } from '../../components/post/post.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { Store } from '@ngrx/store';
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {PostModel} from "../../models/post.model";
import {CommentModel} from "../../models/comment.model";
import {ButtonModule} from "primeng/button";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {heroFireMini} from "@ng-icons/heroicons/mini";
import {heroHeartSolid} from "@ng-icons/heroicons/solid";
import {ChipsModule} from "primeng/chips";
import {PaginatorModule} from "primeng/paginator";
import {ActivatedRoute, RouterLink, RouterLinkActive} from "@angular/router";
import {PostsService} from "../../services/posts/posts.service";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, PostComponent, CommentComponent, ButtonModule, NgIcon, ChipsModule, PaginatorModule, RouterLink, RouterLinkActive],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [PostsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({heroFireMini, heroHeartSolid})]
})
export class HomePageComponent implements OnInit{
  postsService = inject(PostsService);

  authState$ = inject(Store).select('auth');

  trending$: BehaviorSubject<Observable<PostModel[]>> = new BehaviorSubject<Observable<PostModel[]>>(of([]))

  route = inject(ActivatedRoute)

  ngOnInit() {
    this.route.queryParams.subscribe({
      next: (data) => {
        if(data['sorted'] === 'top') {
          this.trending$.next(this.postsService.getTopPosts())
        } else {
          this.trending$.next(this.postsService.getNewPosts())
        }
      }
    })
  }
}
