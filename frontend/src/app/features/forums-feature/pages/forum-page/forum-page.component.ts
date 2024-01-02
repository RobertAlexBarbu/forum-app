import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamPlus } from '@ng-icons/jam-icons';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { ForumsService } from '../../services/forums/forums.service';
import { ForumsPageComponent } from '../forums-page/forums-page.component';
import { PostComponent } from '../../components/post/post.component';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { Store } from '@ngrx/store';
import { isAuthPipe } from '../../../../shared/pipes/is-auth.pipe';
import { ForumModel } from '../../models/forum.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-forum-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgIcon,
    RouterLink,
    ForumsPageComponent,
    PostComponent,
    PostsPageComponent,
    RouterOutlet,
    isAuthPipe
  ],
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ jamPlus })]
})
export class ForumPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  route = inject(ActivatedRoute);

  forumsService = inject(ForumsService);

  forum!: ForumModel;

  authState$ = inject(Store).select('auth');

  ngOnInit() {
    this.forumsService
      .getForum(this.route.snapshot.params['id'])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.forum = data;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
