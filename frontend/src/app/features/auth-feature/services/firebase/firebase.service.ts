import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseAuthDto } from '../../dto/firebase-auth.dto';
import { from, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../../../core/services/auth/auth.service';
import firebase from 'firebase/compat/app';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  authService = inject(AuthService);
  firebaseAuthService = inject(AngularFireAuth);

  signupWithEmailAndPassword(firebaseAuthDto: FirebaseAuthDto) {
    return from(
      this.firebaseAuthService.createUserWithEmailAndPassword(
        firebaseAuthDto.email,
        firebaseAuthDto.password
      )
    ).pipe(switchMap(this.handleUserData));
  }

  signupWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    return this.signupWithProvider(provider);
  }

  private signupWithProvider(provider: any) {
    return from(this.firebaseAuthService.signInWithPopup(provider)).pipe(
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
