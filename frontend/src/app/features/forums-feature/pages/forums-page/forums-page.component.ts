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
import {RouterLink} from "@angular/router";
import {
  ModalComponent
} from "../../../../shared/components/modal/modal.component";
import {MenuComponent} from "../../../../core/components/menu/menu.component";
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {Subject} from "rxjs";
import {ForumsService} from "../../services/forums.service";
import {ForumComponent} from "../../components/forum/forum.component";
import {ForumModel} from "../../models/forum.model";

@Component({
  selector: 'app-forums-page',
  standalone: true,
  imports: [CommonModule, ButtonModule, NgIcon, RouterLink, ModalComponent, MenuComponent, FormsModule, InputTextModule, PaginatorModule, ReactiveFormsModule, ForumComponent],
  templateUrl: './forums-page.component.html',
  styleUrls: ['./forums-page.component.scss'],
  viewProviders: [provideIcons({jamPlus})],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumsPageComponent implements OnInit{
  _forumModal = false;
  _deleteModal = false;
  error$ = new Subject<string>();
  forumsService = inject(ForumsService);
  forums$ = new Subject<ForumModel[]>();
  forums: ForumModel[] = [];
  toBeDeletedForum: ForumModel | null = null;
  set forumModal(value: boolean) {
    this._forumModal = value;
  }
  get forumModal() {
    return this._forumModal;
  }

  set deleteModal(value: boolean) {
    this._deleteModal = value;
  }
  get deleteModal() {
    return this._deleteModal;
  }

  ngOnInit() {
    this.forumsService.getForums().subscribe({
      next: (data) => {
        this.forums$.next(data);
        this.forums = data;
      }
    })
  }

  form = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(32)]
  })

  openDeleteModal(forum: ForumModel) {
    this.toBeDeletedForum = forum;
    this.deleteModal = true;
  }
  closeDeleteModal() {
    this.deleteModal = false;
    this.error$.next('');
  }


  deleteForum() {
    this.error$.next('');
    if(this.toBeDeletedForum) {
      const deletedForum = this.toBeDeletedForum;
      this.forumsService.deleteForum(this.toBeDeletedForum.id).subscribe();
      this.forums.splice(this.forums.findIndex(forum => forum.id === deletedForum.id), 1);
      this.deleteModal = false;
    }
  }

  openForumModal() {
    this.form.reset();
    this.forumModal = true;
  }
  closeForumModal() {
    this.forumModal = false;
    this.error$.next('');
  }
  loading = false;

  onSubmit() {
    this.error$.next('');
    if(!this.form.valid) {
      this.form.markAsDirty();
    } else {
      this.loading = true;
      this.forumsService.saveForum(this.form.value).subscribe({
        next: (data) => {
          this.error$.next('');
          this.forums.push(data);
          this.forums$.next(this.forums)
          this.loading=false;
          this.forumModal = false;
        },
        error: (err) => {

          this.error$.next(err.message);
          this.loading = false;
          this.form.markAsUntouched()
          this.form.markAsPristine();
        }
      })
    }
  }

}
