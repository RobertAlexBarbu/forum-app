import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {importProvidersFrom} from "@angular/core";
import {getAuth, provideAuth} from "@angular/fire/auth";

const firebaseProviders = importProvidersFrom([
  provideFirebaseApp(() => initializeApp({
    "projectId": "ssd-project-1f0eb",
    "appId": "1:897753042865:web:9310bb659a3ddd31043790",
    "storageBucket": "ssd-project-1f0eb.appspot.com",
    "apiKey": "AIzaSyBBU1wO-V4gMnTNSSNct9OT-3jgOSnZCKA",
    "authDomain": "ssd-project-1f0eb.firebaseapp.com",
    "messagingSenderId": "897753042865"
  })),
  provideAuth(() => getAuth())
]);

export { firebaseProviders };
