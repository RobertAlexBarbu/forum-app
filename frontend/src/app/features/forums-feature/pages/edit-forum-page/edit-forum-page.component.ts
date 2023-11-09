import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChipsModule} from "primeng/chips";
import {ButtonModule} from "primeng/button";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {jamPencilF, jamPlus, jamTrashF} from "@ng-icons/jam-icons";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ForumsService} from "../../services/forums.service";
import {CategoryModel} from "../../models/forum-with-categories.model";
import {ForumModel} from "../../models/forum.model";
import { Subject} from "rxjs";

@Component({
  selector: 'app-new-forum-page',
  standalone: true,
  imports: [CommonModule, ChipsModule, ButtonModule, NgIcon, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-forum-page.component.html',
  styleUrls: ['./edit-forum-page.component.scss'],
  viewProviders: [provideIcons({jamPlus, jamTrashF, jamPencilF})],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditForumPageComponent implements OnInit{
  forum!: {name: string, id:number};
  categories: CategoryModel[] = [];
  categories$: Subject<CategoryModel[]> = new Subject<CategoryModel[]>();
  errors$ : Subject<string> = new Subject<string>();
  categoriesDeleted: number[] = [];
  categoriesAdded: {name: string, forum_id: number}[] = [];
  route = inject(ActivatedRoute);
  router = inject(Router);
  forumsService = inject(ForumsService)
  category = new FormControl('', {
    nonNullable: true,
    updateOn: 'blur',
    validators: [Validators.required]
  });
  forumName = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  })

  addCategory() {
    if(this.category.valid) {
      this.categoriesAdded.push({
        name: this.category.getRawValue(),
        forum_id: this.forum.id
      })
      this.categories!.push({
        name: this.category.getRawValue(),
        id: -1
      });
      this.categories$.next(this.categories);
      this.elementHeight += 2.7;
      if(this.element) {
        this.element.style.height = this.elementHeight + 'rem';
      }
    } else {
      this.category.markAsDirty();
    }

  }
  deleteCategory(category: CategoryModel, index: number) {
    this.categories!.splice(index, 1);
    this.categories$.next(this.categories);
    this.categoriesAdded.splice(this.categoriesAdded.findIndex( c => {
      return c.name == category.name
    }), 1)
    if(category.id > 0) {
      this.categoriesDeleted.push(category.id);
    }
    this.elementHeight -= 2.7;
    if(this.element) {
      this.element.style.height = this.elementHeight + 'rem';
    }
  }
  onSubmit() {
    if(this.forum && this.forumName.valid) {
      this.forumsService.editForum(this.route.snapshot.params['id'], {
        id: this.forum.id,
        name: this.forumName.getRawValue(),
        deletedCategoriesIds: this.categoriesDeleted,
        addedCategories: this.categoriesAdded
      }).subscribe(
        {
          next: () => {
            this.router.navigate(["forums"])
          },
          error: (err) => {
            this.errors$.next(err.message);
          }
        }
      )
    } else {
      this.forumName.markAsDirty();
      this.category.markAsPristine();
    }
  }
  element:HTMLElement | null = null;
  elementHeight = 0;
  ngOnInit() {
    this.element = document.querySelector('.categories');
    this.forumsService.getForumWithCategories(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.forum = {
          id: data.id,
          name: data.name
        }
        this.categories = data.categories;
        this.categories$.next(this.categories);
        if(this.element) {
          this.elementHeight = 1.5 + 2.7 * this.categories.length
          this.element.style.height = this.elementHeight +  'rem';
        }
        this.forumName.patchValue(data.name)
      }
    })
  }
}
