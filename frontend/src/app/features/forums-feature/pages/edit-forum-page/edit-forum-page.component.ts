import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {ForumsService} from "../../services/forums/forums.service";
import {Subject} from "rxjs";
import {CategoryModel} from "../../models/category.model";
import {ForumModel} from "../../models/forum.model";

@Component({
  selector: 'app-new-forum-page',
  standalone: true,
  imports: [CommonModule, ChipsModule, ButtonModule, NgIcon, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-forum-page.component.html',
  styleUrls: ['./edit-forum-page.component.scss'],
  viewProviders: [provideIcons({jamPlus, jamTrashF, jamPencilF})],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditForumPageComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  forumsService = inject(ForumsService)

  ngOnInit() {
    this.forumsService.getForumForEdit(this.route.snapshot.params['id']).subscribe({
      next: (data) => {
        this.forum = data;
        this.categories = data.categories;
        this.categories$.next(this.categories);
        this.forumName.patchValue(data.name)
      }
    })
  }

  forum!: ForumModel;
  categories: CategoryModel[] = [];
  categoriesDeleted: { id: number, name: string }[] = [];
  categoriesAdded: { name: string }[] = [];

  categories$: Subject<CategoryModel[]> = new Subject<CategoryModel[]>();
  errors$: Subject<string> = new Subject<string>();

  categoryName = new FormControl('', {
    nonNullable: true,
    updateOn: 'blur',
    validators: [Validators.required]
  });
  forumName = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  })

  addCategory() {
    if (this.categoryName.valid) {
      this.categoriesAdded.push({
        name: this.categoryName.getRawValue(),
      })
      this.categories!.push({
        name: this.categoryName.getRawValue(),
        id: -1,
      });
      this.categories$.next(this.categories);
      this.categoryName.reset();
    } else {
      this.categoryName.markAsDirty();
    }
  }

  deleteCategory(category: CategoryModel, index: number) {
    this.categories!.splice(index, 1);
    this.categories$.next(this.categories);
    this.categoriesAdded.splice(this.categoriesAdded.findIndex(c => {
      return c.name == category.name
    }), 1)
    if (category.id > 0) {
      this.categoriesDeleted.push(category);
    }
  }

  onSubmit() {
    if (this.forum && this.forumName.valid) {
      this.forumsService.updateForum(this.route.snapshot.params['id'], {
        name: this.forumName.getRawValue(),
        deletedCategories: this.categoriesDeleted,
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
      this.categoryName.markAsPristine();
    }
  }

}
