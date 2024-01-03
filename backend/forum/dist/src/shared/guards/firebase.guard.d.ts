import { CanActivate, ExecutionContext } from '@nestjs/common';
import { FirebaseService } from "../../modules/global/firebase/firebase.service";
import { EntityManager } from "@mikro-orm/core";
export declare class FirebaseGuard implements CanActivate {
    private readonly firebaseService;
    private readonly em;
    constructor(firebaseService: FirebaseService, em: EntityManager);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
