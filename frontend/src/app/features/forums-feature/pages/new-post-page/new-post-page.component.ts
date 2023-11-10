import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownModule} from "primeng/dropdown";
import {ForumsService} from "../../services/forums/forums.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Observable, switchMap} from "rxjs";
import {
  CategoryModel,
  ForumWithCategoriesModel
} from "../../models/forum-with-categories.model";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {ChipsModule} from "primeng/chips";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {PostsService} from "../../services/posts/posts.service";
import {Store} from "@ngrx/store";
import {AuthStateModel} from "../../../../core/models/auth-state.model";
import {
  FormUtilsService
} from "../../../../core/services/form-utils/form-utils.service";

@Component({
  selector: 'app-new-post-page',
  standalone: true,
  imports: [CommonModule, DropdownModule, ReactiveFormsModule, ChipsModule, InputTextareaModule, ButtonModule, RouterLink],
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPostPageComponent implements OnInit {
  forumsService = inject(ForumsService);
  postsService = inject(PostsService);
  store = inject(Store);
  forumWithCategories$ = new Observable<ForumWithCategoriesModel>()
  route = inject(ActivatedRoute);
  router = inject(Router);
  formUtils = inject(FormUtilsService);
  form = new FormGroup({
    category: new FormControl<CategoryModel | null>(null, {}),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(32)]
    }),
    content: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
  })

  ngOnInit() {
    this.forumWithCategories$ = this.forumsService.getForumWithCategories(this.route.snapshot.params['id'])
  }

  onSubmit() {
    if(this.form.valid) {
      let formValue = this.form.getRawValue()
      let category_id: number | null = null;
      if (this.form.controls['category'].getRawValue()) {
        category_id = this.form.controls['category'].getRawValue()!.id;
      }
      this.store.select('auth').pipe(switchMap((authState: AuthStateModel) => {
        return this.postsService.createPost({
          title: this.form.controls['title'].getRawValue(),
          content: this.form.controls['content'].getRawValue(),
          forum_id: this.route.snapshot.params['id'],
          category_id: category_id,
          user_id: authState.id
        })
      })).subscribe({
        next: () => {
          return this.router.navigate(['../'], {
            relativeTo: this.route
          })
        }
      });
    } else {
      this.formUtils.markGroupDirty(this.form);
    }

  }


}
