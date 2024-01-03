import { CanActivate, ExecutionContext } from '@nestjs/common';
import { EntityManager } from "@mikro-orm/core";
export declare class CanEditPostGuard implements CanActivate {
    private em;
    constructor(em: EntityManager);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
