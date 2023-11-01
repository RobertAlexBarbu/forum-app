import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-one-forum-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './one-forum-page.component.html',
  styleUrls: ['./one-forum-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneForumPageComponent {

}
