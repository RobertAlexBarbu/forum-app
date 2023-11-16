import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ForumsService} from "../../services/forums/forums.service";
import {PostComponent} from "../../components/post/post.component";
import {CommentComponent} from "../../components/comment/comment.component";

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
  trending$ = this.forumsService.getTrending();
}
