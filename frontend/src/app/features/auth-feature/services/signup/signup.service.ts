import { inject, Injectable } from '@angular/core';
import { ErrorService } from '../../../../core/services/error/error.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseAuthDto } from '../../dto/firebase-auth.dto';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  errorService = inject(ErrorService);

  authService = inject(AuthService);

  firebaseAuthService = inject(AngularFireAuth);

  signupWithEmailAndPassword(firebaseAuthDto: FirebaseAuthDto) {
    return from(
      this.firebaseAuthService.createUserWithEmailAndPassword(
        firebaseAuthDto.email,
        firebaseAuthDto.password
      )
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorService.handleError(error);
      }),
      switchMap(this.handleUserData)
    );
  }

  signupWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return this.signupWithProvider(provider);
  }

  private signupWithProvider(provider: AuthProvider) {
    return from(this.firebaseAuthService.signInWithPopup(provider)).pipe(
      catchError((error: HttpErrorResponse) => {
        return this.errorService.handleError(error);
      }),
      switchMap(this.handleUserData)
    );
  }

  private handleUserData = (firebaseUserData: firebase.auth.UserCredential) => {
    const currentUser = firebaseUserData.user;
    if (currentUser) {
      const token = currentUser.getIdToken();

      return from(token).pipe(
        switchMap((token) => {
          return this.authService.signup({ firebaseToken: token });
        })
      );
    } else {
      return throwError(() => new Error('Firebase signup failed'));
    }
  };
}
