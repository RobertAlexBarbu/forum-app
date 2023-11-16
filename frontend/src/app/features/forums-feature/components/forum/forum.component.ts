import {
  ChangeDetectionStrategy,
  Component, EventEmitter,
  Input, Output
} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ForumModel} from "../../models/forum.model";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {jamMessagesF, jamMessageF, jamMessage, jamPencilF, jamTrashF} from "@ng-icons/jam-icons";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import {DockModule} from "primeng/dock";
import {TimeAgoPipe} from "../../../../shared/pipes/time-ago.pipe";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, NgIcon, ButtonModule, RouterLink, DockModule, TimeAgoPipe],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({jamMessagesF, jamMessageF, jamMessage, jamPencilF, jamTrashF})]
})
export class ForumComponent {
  @Input() forum!: ForumModel;
  @Output() deleteForum = new EventEmitter<ForumModel>();

  delete() {
    this.deleteForum.emit(this.forum);
  }
}
