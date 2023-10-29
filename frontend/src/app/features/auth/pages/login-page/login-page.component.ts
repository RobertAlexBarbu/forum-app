import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {Store} from "@ngrx/store";
import {login} from "../../../../core/store/auth/auth.actions";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {Subject} from "rxjs";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {
  FormUtilsService
} from "../../../../core/services/form-utils/form-utils.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ReactiveFormsModule, ButtonModule, RouterLink, PasswordModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss', '../auth.shared.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store);
  error$ = new Subject<string>();
  formUtils = inject(FormUtilsService);
  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    })
  })
  loading = false;
  submitForm() {
    this.error$.next('');
    if(!this.loginForm.valid) {
      this.formUtils.markGroupDirty(this.loginForm);
    } else {
      this.loading = true;
      this.authService.login(this.loginForm.getRawValue()).subscribe({
        next: (data) => {
          this.store.dispatch(login({sessionData: data}));
          this.loading = false;
          return this.router.navigate(['']);
        },
        error: (err) => {
          this.error$.next(err.message);
          this.loading = false;
          this.loginForm.patchValue({
            username: '',
            password: ''
          })
          this.loginForm.markAsUntouched()
          this.loginForm.markAsPristine();
        }
      });
    }
  }
}
