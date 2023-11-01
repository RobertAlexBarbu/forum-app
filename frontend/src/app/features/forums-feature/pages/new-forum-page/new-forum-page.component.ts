import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-forum-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-forum-page.component.html',
  styleUrls: ['./new-forum-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewForumPageComponent {

}
