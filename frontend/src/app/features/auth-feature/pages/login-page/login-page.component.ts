import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Store } from '@ngrx/store';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormUtilsService } from '../../../../core/services/form-utils/form-utils.service';
import { DropdownModule } from 'primeng/dropdown';
import { ErrorComponent } from '../../../../shared/components/error/error.component';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { OrDividerComponent } from '../../../../shared/components/or-divider/or-divider.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterLink,
    PasswordModule,
    DropdownModule,
    ErrorComponent,
    OrDividerComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss', '../auth.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  loading = false;
  error$ = new BehaviorSubject<string>('');
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true
    })
  });

  firebaseService = inject(FirebaseService);
  formUtils = inject(FormUtilsService);
  router = inject(Router);
  store = inject(Store);

  onSubmit() {
    this.error$.next('');
    if (!this.form.valid) {
      this.formUtils.markGroupDirty(this.form);
    } else {
      this.loading = true;
      from(
        this.firebaseService.loginWithEmailAndPassword({
          email: this.form.getRawValue().email,
          password: this.form.getRawValue().password
        })
      ).subscribe({
        next: (data) => {
          // localStorage.setItem('access_token', data.access_token);
          // // const authState = JSON.parse(atob(data.access_token.split('.')[1]));
          // this.store.dispatch(login({ authState: authState }));
          this.loading = false;
          return this.router.navigate(['']);
        },
        error: (err: Error) => {
          this.error$.next(err.message);
          this.loading = false;
          this.form.markAsUntouched();
          this.form.markAsPristine();
        }
      });
    }
  }
  loginGoogle() {
    this.firebaseService.loginWithGoogle().subscribe({
      next: (data) => {
        this.loading = false;
        return this.router.navigate(['']);
      },
      error: (err: Error) => {
        this.error$.next(err.message);
        this.form.markAsUntouched();
        this.form.markAsPristine();
      }
    });
  }
}
