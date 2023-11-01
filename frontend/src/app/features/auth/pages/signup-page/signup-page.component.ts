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
import {Router, RouterLink} from "@angular/router";
import {Store} from "@ngrx/store";
import { signup} from "../../../../core/store/auth/auth.actions";
import { Subject} from "rxjs";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {AuthStateModel} from "../../../../core/model/auth-state.model";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {
  InputErrorComponent
} from "../../../../shared/components/input-error/input-error.component";
import {
  passwordValidator
} from "../../../../shared/validators/password.validator";
import {
  FormUtilsService
} from "../../../../core/services/form-utils/form-utils.service";

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, RouterLink, PasswordModule, InputErrorComponent],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss', '../auth.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store<{ auth: AuthStateModel }>)
  error$ = new Subject<string>();
  formUtils = inject(FormUtilsService);
  form = new FormGroup(
    {
      username: new FormControl("", {
        validators: [Validators.maxLength(32), Validators.required],
        nonNullable: true,
      }),
      email: new FormControl("", {
        validators: [Validators.maxLength(64), Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl("", {
        validators: [Validators.maxLength(1000), Validators.required, Validators.minLength(8), passwordValidator],
        nonNullable: true,
      })
    }
  )
  loading = false;
  onSubmit() {
    this.error$.next('');
    if(!this.form.valid) {
      this.formUtils.markGroupDirty(this.form);
    } else {
      this.loading = true;
      this.authService.signup(this.form.getRawValue()).subscribe({
        next: (data) => {
          this.store.dispatch(signup({sessionData: data}));
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
