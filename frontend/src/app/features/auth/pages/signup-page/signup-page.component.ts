import {
  ChangeDetectionStrategy,
  Component,
  inject, OnInit,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControl,
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
import {combineLatest, startWith, Subject} from "rxjs";
import {AuthService} from "../../../../core/services/auth/auth.service";
import {AuthStateModel} from "../../../../core/model/auth-state.model";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {
  InputErrorComponent
} from "../../../../shared/components/input-error/input-error.component";
import {
  passwordValidator
} from "../../../../shared/Validators/password.validator";
import {
  FormUtilsService
} from "../../../../core/services/form-utils/form-utils.service";

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, ButtonModule, RouterLink, PasswordModule, InputErrorComponent],
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss', '../auth.shared.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupPageComponent implements OnInit{
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store<{ auth: AuthStateModel }>)
  error$ = new Subject<string>();
  formUtils = inject(FormUtilsService);
  form = new FormGroup(
    {
      username: new FormControl("", {
        validators: [Validators.maxLength(32), Validators.required],
        nonNullable: true
      }),
      email: new FormControl("", {
        validators: [Validators.maxLength(64), Validators.required, Validators.email],
        nonNullable: true
      }),
      password: new FormControl("", {
        validators: [Validators.maxLength(1000), Validators.required, Validators.minLength(8), passwordValidator],
        nonNullable: true
      })
    }
  )
  usernameControl$ = new Subject<AbstractControl>()
  emailControl$ = new Subject<AbstractControl>()
  passwordControl$ =  new Subject<AbstractControl>()
  refresh$ = new Subject<boolean>()
  ngOnInit() {
    combineLatest(
      {
        username: this.form.get('username')!.statusChanges.pipe(startWith(null)),
        email: this.form.get('email')!.statusChanges.pipe(startWith(null)),
        password: this.form.get('password')!.statusChanges.pipe(startWith(null)),
        refresh: this.refresh$.pipe(startWith(true))

      }
    ).subscribe({
      next: (data) => {
        console.log(data);
        this.usernameControl$.next(this.form.get('username')!)
        this.emailControl$.next(this.form.get('email')!)
        this.passwordControl$.next(this.form.get('password')!)
      }
    })
  }
  loading = false;
  onSubmit() {
    this.error$.next('');
    if(!this.form.valid) {
      this.formUtils.markGroupDirty(this.form);
      this.refresh$.next(true);
    } else {
      this.loading = true;
      this.authService.login(this.form.getRawValue()).subscribe({
        next: (data) => {
          this.store.dispatch(signup({sessionData: data}));
          this.loading = false;
          return this.router.navigate(['']);
        },
        error: (err) => {
          this.error$.next(err.message);
          this.loading = false;
          this.form.markAsPristine();
        }
      });
    }
  }

}
