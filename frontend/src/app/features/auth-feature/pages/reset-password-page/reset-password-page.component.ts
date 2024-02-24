import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {InputTextareaModule} from "primeng/inputtextarea";
import {ButtonModule} from "primeng/button";
import {AsyncPipe, NgIf} from "@angular/common";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {login} from "../../../../core/store/auth/auth.actions";
import {
  FormUtilsService
} from "../../../../core/services/form-utils/form-utils.service";
import {
  ErrorComponent
} from "../../../../shared/components/error/error.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [
    InputTextareaModule,
    ButtonModule,
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    ErrorComponent
  ],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordPageComponent {
  firebaseAuth = inject(AngularFireAuth);
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    })
  })
  router = inject(Router)
  error$: Subject<string> = new Subject<string>();
  formUtils = inject(FormUtilsService);
  onSubmit() {
    this.error$.next('');
    if (!this.form.valid) {
      this.formUtils.markGroupDirty(this.form);
      return;
    }
    this.firebaseAuth.sendPasswordResetEmail(this.form.getRawValue().email).then((data) => {
      this.router.navigate(['auth', 'reset-success'])
    }).catch((err) => {
      this.error$.next(err.message);
    })
  }
}
