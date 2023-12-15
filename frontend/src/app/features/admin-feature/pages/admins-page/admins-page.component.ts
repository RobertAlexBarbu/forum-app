import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { Subject } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { PaginatorModule } from 'primeng/paginator';

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
    ReactiveFormsModule
  ],
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ jamPlus })]
})
export class AdminsPageComponent {
  adminService = inject(AdminService);

  admins$ = this.adminService.findAdmins();
  error$ = new Subject<string>();

  addAdminForm = new FormControl('', {
    validators: Validators.required,
    nonNullable: true
  });

  addAdmin() {
    if (this.addAdminForm.valid) {
      this.adminService
        .updateToAdmin({ username: this.addAdminForm.getRawValue() })
        .subscribe({
          next: (data) => {
            if (data === null) {
              this.error$.next('AppUser not found');
            } else {
              window.location.reload();
            }
          }
        });
    } else {
      this.addAdminForm.markAsDirty();
    }
  }

  demoteAdmin(id: number) {
    this.adminService.demoteAdmin(id).subscribe({
      next: () => {
        window.location.reload();
      }
    });
  }
}
