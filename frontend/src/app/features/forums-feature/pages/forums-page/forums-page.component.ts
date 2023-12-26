import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamPlus } from '@ng-icons/jam-icons';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { Observable, Subject } from 'rxjs';
import { ForumsService } from '../../services/forums/forums.service';
import { ForumComponent } from '../../components/forum/forum.component';
import { ForumModel } from '../../models/forum.model';
import { AuthStateModel } from '../../../../core/models/auth-state.model';
import { Store } from '@ngrx/store';
import { isAdminPipe } from '../../../../shared/pipes/is-admin.pipe';

@Component({
  selector: 'app-forums-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgIcon,
    RouterLink,
    ModalComponent,
    FormsModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    ForumComponent,
    isAdminPipe
  ],
  templateUrl: './forums-page.component.html',
  styleUrls: ['./forums-page.component.scss'],
  viewProviders: [provideIcons({ jamPlus })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumsPageComponent implements OnInit {
  addForumModal = false;

  deleteForumModal = false;

  forums: ForumModel[] = [];

  toBeDeletedForum: ForumModel | null = null;

  loading = false;

  error$ = new Subject<string>();

  forums$ = new Subject<ForumModel[]>();

  authState$: Observable<AuthStateModel> = inject(Store).select('auth');

  forumsService = inject(ForumsService);

  addForumForm = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(32)]
  });

  ngOnInit() {
    this.forumsService
      .getForums()
      .pipe()
      .subscribe({
        next: (data) => {
          this.forums$.next(data);
          this.forums = data;
        }
      });
  }

  openDeleteModal(forum: ForumModel) {
    this.toBeDeletedForum = forum;
    this.deleteForumModal = true;
    this.error$.next('');
  }

  closeDeleteModal() {
    this.deleteForumModal = false;
  }

  openForumModal() {
    this.addForumForm.reset();
    this.addForumModal = true;
    this.error$.next('');
  }

  closeForumModal() {
    this.addForumModal = false;
  }

  deleteForum() {
    if (this.toBeDeletedForum) {
      this.forumsService
        .deleteForum(this.toBeDeletedForum.id)
        .pipe()
        .subscribe({
          next: () => {
            this.forums.splice(
              this.forums.findIndex(
                (forum) => forum.id === this.toBeDeletedForum!.id
              ),
              1
            );
            this.forums$.next(this.forums);
            this.deleteForumModal = false;
          },
          error: (err) => {
            err.next(err.message);
          }
        });
    }
  }

  addForum() {
    this.error$.next('');
    if (!this.addForumForm.valid) {
      this.addForumForm.markAsDirty();
    } else {
      this.loading = true;
      this.forumsService
        .createForum({ name: this.addForumForm.value })
        .pipe()
        .subscribe({
          next: (data) => {
            this.error$.next('');
            this.forums.push(data);
            this.forums$.next(this.forums);
            this.loading = false;
            this.addForumModal = false;
            window.location.reload();
          },
          error: (err) => {
            this.error$.next(err.message);
            this.loading = false;
            this.addForumForm.markAsUntouched();
            this.addForumForm.markAsPristine();
          }
        });
    }
  }
}
