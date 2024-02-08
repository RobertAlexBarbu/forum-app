import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter, inject,
  Input,
  Output
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ForumModel } from '../../models/forum.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {

  jamPencilF,
  jamTrashF
} from '@ng-icons/jam-icons';
import { ButtonModule } from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import { DockModule } from 'primeng/dock';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { AuthStateModel } from '../../../../core/models/auth-state.model';
import { isAdminPipe } from '../../../../shared/pipes/is-admin.pipe';
import {

  heroChatBubbleOvalLeftEllipsisSolid,
  heroChatBubbleOvalLeftSolid,
  heroClockSolid
} from "@ng-icons/heroicons/solid";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    NgIcon,
    ButtonModule,
    RouterLink,
    DockModule,
    TimeAgoPipe,
    isAdminPipe
  ],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      jamTrashF,
      heroChatBubbleOvalLeftEllipsisSolid,
      heroChatBubbleOvalLeftSolid,
      heroClockSolid,
      jamPencilF

    })
  ]
})
export class ForumComponent {
  @Input() authState!: AuthStateModel;

  @Input() forum!: ForumModel;

  @Output() deleteForum = new EventEmitter<ForumModel>();

  router = inject(Router);

  delete(event: any) {
    event.stopPropagation();
    this.deleteForum.emit(this.forum);
  }
  edit(event: any, forumId: number) {
    event.stopPropagation();
    this.router.navigate([ 'forums', 'edit', forumId])
  }
}
