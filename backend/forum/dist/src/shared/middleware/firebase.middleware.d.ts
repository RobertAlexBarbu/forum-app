import { NestMiddleware } from '@nestjs/common';
import { FirebaseService } from '../../modules/global/firebase/firebase.service';
export declare class FirebaseMiddleware implements NestMiddleware {
    private readonly firebaseService;
    constructor(firebaseService: FirebaseService);
    use(req: any, res: any, next: (error?: any) => void): Promise<any>;
}
