import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumsService } from '../../services/forums/forums.service';
import { PostComponent } from '../../components/post/post.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { Store } from '@ngrx/store';
import {Observable} from "rxjs";
import {PostModel} from "../../models/post.model";
import {CommentModel} from "../../models/comment.model";
import {ButtonModule} from "primeng/button";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {heroFireMini} from "@ng-icons/heroicons/mini";
import {heroHeartSolid} from "@ng-icons/heroicons/solid";
import {ChipsModule} from "primeng/chips";


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, PostComponent, CommentComponent, ButtonModule, NgIcon, ChipsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [ForumsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({heroFireMini, heroHeartSolid})]
})
export class HomePageComponent {
  forumsService = inject(ForumsService);

  authState$ = inject(Store).select('auth');

  trending$: Observable<{latestPosts: PostModel[], latestComments: CommentModel[] }> = this.forumsService.getTrending();
}
