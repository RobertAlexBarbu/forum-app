import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ForumsService } from '../../services/forums/forums.service';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostComponent, NgOptimizedImage],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {
  route = inject(ActivatedRoute);

  forumsService = inject(ForumsService);

  forum$ = this.forumsService.getForum(this.route.snapshot.params['id']);
}
