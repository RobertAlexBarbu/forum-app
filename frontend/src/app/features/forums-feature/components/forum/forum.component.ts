import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  Input
} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ForumModel} from "../../models/forum.model";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {jamMessagesF, jamMessageF, jamMessage, jamPencilF, jamTrashF} from "@ng-icons/jam-icons";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, NgIcon, ButtonModule],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({jamMessagesF, jamMessageF, jamMessage, jamPencilF, jamTrashF})]
})
export class ForumComponent {
  @Input() forum!: ForumModel;
}
