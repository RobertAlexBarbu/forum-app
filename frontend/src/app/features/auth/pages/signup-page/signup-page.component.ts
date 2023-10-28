import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {HttpService} from "../../../../core/services/http/http.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {login, signup} from "../../../../core/store/auth/auth.actions";
import {SessionDataModel} from "../../../../core/model/session-data.model";
import {Subject} from "rxjs";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {AuthStateModel} from "../../../../core/model/auth-state.model";

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPageComponent {
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store<{ auth: AuthStateModel }>)
  error$ = new Subject<string>();
  signupForm = new FormGroup(
    {
      username: new FormControl("", {
        validators: [Validators.maxLength(32), Validators.minLength(1)],
        nonNullable: true
      }),
      email: new FormControl("", {
        validators: [Validators.maxLength(64), Validators.minLength(1), Validators.email],
        nonNullable: true
      }),
      password: new FormControl("", {
        validators: [Validators.maxLength(1000), Validators.minLength(1)],
        nonNullable: true
      })
    }
  )

  onSubmit() {
    this.authService.signup(this.signupForm.getRawValue()).subscribe({
      next: (data) => {
        this.store.dispatch(login({sessionData: data}));
        return this.router.navigate(['']);
      },
      error: (err) => {
        this.error$.next(err.message);
      }
    });
  }

}
