import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChipsModule} from "primeng/chips";
import {ButtonModule} from "primeng/button";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {jamPencilF, jamPlus, jamTrashF} from "@ng-icons/jam-icons";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-forum-page',
  standalone: true,
  imports: [CommonModule, ChipsModule, ButtonModule, NgIcon, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-forum-page.component.html',
  styleUrls: ['./edit-forum-page.component.scss'],
  viewProviders: [provideIcons({jamPlus, jamTrashF, jamPencilF})],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditForumPageComponent implements OnInit{
  categories: string[] = [];
  category = new FormControl('', {
    nonNullable: true,
  });

  height = 0;
  addCategory() {
    this.categories.push(this.category.getRawValue());
    console.log(this.categories);
    this.height += 2.7;
    this.element.style.height = this.height + 'rem';
  }
  submit() {
    console.log('Forum submitted')
  }
  element:any ;
  ngOnInit() {
    this.element = document.querySelector('.categories');


  }
}
