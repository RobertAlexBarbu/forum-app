import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumsService } from '../../services/forums/forums.service';
import { PostsService } from '../../services/posts/posts.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormUtilsService } from '../../../../core/services/form-utils/form-utils.service';
import { Observable } from 'rxjs';
import { ForumModel } from '../../models/forum.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-edit-post-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edit-post-page.component.html',
  styleUrls: ['./edit-post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPostPageComponent implements OnInit {
  forumsService = inject(ForumsService);

  postsService = inject(PostsService);

  route = inject(ActivatedRoute);

  router = inject(Router);

  formUtils = inject(FormUtilsService);

  ngOnInit() {
    this.forum$ = this.forumsService.getForum(this.route.snapshot.params['id']);
    this.postsService.getPost(this.route.snapshot.params['post']).subscribe({
      next: (data) => {
        console.log(data);
        if (data.category) {
          this.form.get('category')?.setValue(data.category.id);
        }

        this.ph = 'Category';
        this.id = data.id;
        this.form.get('title')?.setValue(data.title);
        this.form.get('content')?.setValue(data.content);
      }
    });
  }

  ph = '';

  id = 0;

  forum$ = new Observable<ForumModel>();

  form = new FormGroup({
    category: new FormControl<number | null>(null, {}),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(32)]
    }),
    content: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  onSubmit() {
    if (this.form.valid) {
      this.postsService
        .updatePost(
          {
            title: this.form.controls['title'].getRawValue(),
            content: this.form.controls['content'].getRawValue(),
            categoryId: this.form.controls['category'].getRawValue()
          },
          this.id
        )
        .subscribe({
          next: () => {
            return this.router.navigate([`../../${this.id}`], {
              relativeTo: this.route
            });
          }
        });
    } else {
      this.formUtils.markGroupDirty(this.form);
    }
  }
}
