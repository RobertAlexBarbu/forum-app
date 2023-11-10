import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {jamPlus} from "@ng-icons/jam-icons";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ForumsService} from "../../services/forums/forums.service";
import {ForumsPageComponent} from "../forums-page/forums-page.component";
import {PostComponent} from "../../components/post/post.component";

@Component({
  selector: 'app-one-forum-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, NgIcon, RouterLink, ForumsPageComponent, PostComponent],
  templateUrl: './one-forum-page.component.html',
  styleUrls: ['./one-forum-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({jamPlus})],
})
export class OneForumPageComponent implements OnInit{
  route = inject(ActivatedRoute);
  forumsService = inject(ForumsService);
  forum$ = this.forumsService.getForum(this.route.snapshot.params['id']);
  ngOnInit() {

  }
}
