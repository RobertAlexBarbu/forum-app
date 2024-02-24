import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostModel } from '../../models/post.model';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { Router, RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  jamArrowSquareUp,
  jamArrowSquareUpF,
  jamMessageWritingF
} from '@ng-icons/jam-icons';
import { LikeComponent } from '../like/like.component';
import { AuthStateModel } from '../../../../core/models/auth-state.model';
import { PostsService } from '../../services/posts/posts.service';
import { heroChatBubbleLeftSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe, RouterLink, NgIcon, LikeComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [TimeAgoPipe, PostsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      jamArrowSquareUp,
      jamArrowSquareUpF,
      jamMessageWritingF,
      heroChatBubbleLeftSolid
    })
  ]
})
export class PostComponent {
  @Input() user: boolean = true;

  @Input() forum = false;

  @Input()
  post!: PostModel;

  @Input()
  authState!: AuthStateModel;

  router = inject(Router);

  goToProfile(event: any, username: string) {
    event.stopPropagation();
    this.router.navigate(['profile', username]);
  }

  goToForum(event: any, forumId: number) {
    console.log(forumId);
    event.stopPropagation();
    this.router.navigate(['forums', forumId]);
  }
}
