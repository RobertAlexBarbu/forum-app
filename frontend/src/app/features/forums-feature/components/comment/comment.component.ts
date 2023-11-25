import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { CommentModel } from '../../models/comment.model';
import { ButtonModule } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamTrashF } from '@ng-icons/jam-icons';
import { TooltipModule } from 'primeng/tooltip';
import { IsAdminDirective } from '../../../../shared/directives/is-admin.directive';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    CommonModule,
    TimeAgoPipe,
    ButtonModule,
    NgIcon,
    TooltipModule,
    IsAdminDirective
  ],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ jamTrashF })]
})
export class CommentComponent {
  @Input() comment!: CommentModel;
  @Output() delete = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.comment.id);
  }
}
