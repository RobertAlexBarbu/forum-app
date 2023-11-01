import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ButtonModule} from "primeng/button";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {jamPlus} from "@ng-icons/jam-icons";
import {RouterLink} from "@angular/router";
import {
  ModalComponent
} from "../../../../shared/components/modal/modal.component";
import {MenuComponent} from "../../../../core/components/menu/menu.component";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";

@Component({
  selector: 'app-forums-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, NgIcon, RouterLink, ModalComponent, MenuComponent, FormsModule, InputTextModule, PaginatorModule],
  templateUrl: './forums-page.component.html',
  styleUrls: ['./forums-page.component.scss'],
  viewProviders: [provideIcons({jamPlus})],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumsPageComponent {
  addNewForum = false;
  newForum() {
    console.log(this.addNewForum);
    this.addNewForum = true;
  }
  submit() {
    this.addNewForum = false;
    console.log('Forum submitted')
  }
}
