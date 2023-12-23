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
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import {BehaviorSubject, Subject} from 'rxjs';
import { AuthStateModel } from '../../../../core/store/auth/auth-state.model';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { FormUtilsService } from '../../../../core/services/form-utils/form-utils.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamGoogle } from '@ng-icons/jam-icons';
import firebase from 'firebase/compat/app';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { OrDividerComponent } from '../../../../shared/components/or-divider/or-divider.component';
import {
  ErrorComponent
} from "../../../../shared/components/error/error.component";

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    PasswordModule,
    NgIcon,
    OrDividerComponent,
    ErrorComponent
  ],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss', '../auth.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ jamGoogle })]
})
export class SignupPageComponent {
  error$ = new BehaviorSubject<string>('');
  loading = false;
  form = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.maxLength(64),
        Validators.required,
        Validators.email
      ],
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [
        Validators.maxLength(1000),
        Validators.required,
        Validators.minLength(8),
        passwordValidator
      ],
      nonNullable: true
    })
  });

  firebaseService = inject(FirebaseService);
  router = inject(Router);
  store = inject(Store<{ auth: AuthStateModel }>);
  formUtils = inject(FormUtilsService);

  onSubmit() {
    this.error$.next('');
    if (!this.form.valid) {
      this.formUtils.markGroupDirty(this.form);
    } else {
      this.loading = true;
      this.firebaseService
        .signupWithEmailAndPassword({
          email: this.form.getRawValue().email,
          password: this.form.getRawValue().password
        })
        .subscribe({
          next: (data) => {
            console.log(data);
            this.loading = false;
            return this.router.navigate(['']);
          },
          error: (err) => {
            this.error$.next(err.message);
            this.loading = false;
            this.form.markAsUntouched();
            this.form.markAsPristine();
          }
        });
    }
  }

  signupGoogle() {
    console.log('hey');
    this.firebaseService.signupWithGoogle().subscribe({
      next: (data) => {
        console.log(data);
        this.loading = false;
        return this.router.navigate(['']);
      },
      error: (err) => {
        this.error$.next(err.message);
        this.loading = false;
        this.form.markAsUntouched();
        this.form.markAsPristine();
      }
    });
  }
}
