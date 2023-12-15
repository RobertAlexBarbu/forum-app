import {CanActivate, ExecutionContext} from "@nestjs/common";
import {App, applicationDefault, initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";

export class FirebaseGuard implements CanActivate {
  private firebaseApp: App;
  constructor() {
    this.firebaseApp = initializeApp({
      credential: applicationDefault()
    })
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.body.firebaseToken;
    const auth = getAuth(this.firebaseApp);
    const data = await auth.verifyIdToken(token);
    request.body = {
      email: data.email,
      uid: data.uid
    }
    return true;
  }
}