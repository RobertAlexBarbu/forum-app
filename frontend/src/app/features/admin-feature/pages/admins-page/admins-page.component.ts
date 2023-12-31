import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin/admin.service';
import { AdminComponent } from '../../components/admin/admin.component';
import { ButtonModule } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamPlus } from '@ng-icons/jam-icons';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { PaginatorModule } from 'primeng/paginator';
import { ErrorComponent } from '../../../../shared/components/error/error.component';

@Component({
  selector: 'app-admins-page',
  standalone: true,
  imports: [
    CommonModule,
    AdminComponent,
    ButtonModule,
    NgIcon,
    FormsModule,
    InputTextModule,
    ModalComponent,
    PaginatorModule,
    ReactiveFormsModule,
    ErrorComponent
  ],
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ jamPlus })]
})
export class AdminsPageComponent implements OnDestroy {
  adminService = inject(AdminService);

  destroy$ = new Subject<boolean>();

  admins$ = this.adminService.findAdmins();

  error$: Subject<string> = new Subject<string>();

  addAdminForm = new FormControl('', {
    validators: Validators.required,
    nonNullable: true
  });

  addAdmin() {
    this.error$.next('');
    if (this.addAdminForm.valid) {
      this.adminService
        .updateToAdmin({ username: this.addAdminForm.getRawValue() })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            if (data === null) {
              this.error$.next('User not found');
            } else {
              window.location.reload();
            }
          }
        });
    } else {
      this.addAdminForm.markAsDirty();
    }
  }

  demoteAdmin(id: string) {
    this.adminService
      .demoteAdmin(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          window.location.reload();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
