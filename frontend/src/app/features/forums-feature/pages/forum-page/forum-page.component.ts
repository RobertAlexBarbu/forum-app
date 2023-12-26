import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamPlus } from '@ng-icons/jam-icons';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ForumsService } from '../../services/forums/forums.service';
import { ForumsPageComponent } from '../forums-page/forums-page.component';
import { PostComponent } from '../../components/post/post.component';
import { PostsComponent } from '../../components/posts/posts.component';

@Component({
  selector: 'forum-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgIcon,
    RouterLink,
    ForumsPageComponent,
    PostComponent,
    PostsComponent,
    RouterOutlet
  ],
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ jamPlus })]
})
export class ForumPageComponent {
  route = inject(ActivatedRoute);

  forumsService = inject(ForumsService);

  forum$ = this.forumsService.getForum(this.route.snapshot.params['id']);
}
