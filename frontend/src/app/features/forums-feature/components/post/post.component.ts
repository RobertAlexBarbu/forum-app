import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostModel } from '../../models/post.model';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  jamArrowSquareUp,
  jamArrowSquareUpF,
  jamMessageWritingF
} from '@ng-icons/jam-icons';
import { LikeComponent } from '../like/like.component';
import { AuthStateModel } from '../../../../core/models/auth-state.model';
import {PostsService} from "../../services/posts/posts.service";

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
      jamMessageWritingF
    })
  ],

})
export class PostComponent {
  @Input() forum = false;

  @Input()
  post!: PostModel;

  @Input()
  authState!: AuthStateModel;
}
