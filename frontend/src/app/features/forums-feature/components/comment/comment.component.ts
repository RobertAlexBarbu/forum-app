import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TimeAgoPipe} from "../../../../shared/pipes/time-ago.pipe";
import {CommentModel} from "../../models/comment.model";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
 @Input() comment !:CommentModel;
}
