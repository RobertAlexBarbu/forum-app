import {
  ChangeDetectionStrategy,
  Component,
  inject
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
import {DropdownModule} from "primeng/dropdown";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, ReactiveFormsModule, ButtonModule, RouterLink, PasswordModule, DropdownModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss', '../auth.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store);
  error$ = new Subject<string>();
  formUtils = inject(FormUtilsService);
  form = new FormGroup({
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
    if(!this.form.valid) {
      this.formUtils.markGroupDirty(this.form);
    } else {
      this.loading = true;
      this.authService.login(this.form.getRawValue()).subscribe({
        next: (data) => {
          this.store.dispatch(login({sessionData: data}));
          this.loading = false;
          return this.router.navigate(['']);
        },
        error: (err) => {
          this.error$.next(err.message);
          this.loading = false;
          this.form.markAsUntouched()
          this.form.markAsPristine();
        }
      });
    }
  }

}
