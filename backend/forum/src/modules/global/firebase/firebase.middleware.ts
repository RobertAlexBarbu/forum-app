import {Injectable, NestMiddleware} from "@nestjs/common";
import {FirebaseService} from "./firebase.service";

@Injectable()
export class FirebaseMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseService) {
  }
  async use(req: any, res: any, next: (error?: any) => void): Promise<any> {
    console.log('Mw works!')
    console.log(this.firebaseService)
    const token = req.body.firebaseToken;
    const auth = this.firebaseService.getAuth();
      const data = await auth.verifyIdToken(token);
      req.body = {
        email: data.email,
        uid: data.uid
      }
    next();
    }


}