import { EntityManager } from '@mikro-orm/core';
import { AuthStateModel } from "./auth-state.model";
export declare class AuthService {
    private readonly em;
    constructor(em: EntityManager);
    login(id: string): Promise<AuthStateModel>;
}
