import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumsService } from '../../services/forums/forums.service';
import { PostComponent } from '../../components/post/post.component';
import { CommentComponent } from '../../components/comment/comment.component';
import { Store } from '@ngrx/store';
import {Observable} from "rxjs";
import {PostModel} from "../../models/post.model";
import {CommentModel} from "../../models/comment.model";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, PostComponent, CommentComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  forumsService = inject(ForumsService);

  authState$ = inject(Store).select('auth');

  trending$: Observable<{latestPosts: PostModel[], latestComments: CommentModel[] }> = this.forumsService.getTrending();
}
