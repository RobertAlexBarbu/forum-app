import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(req: any): Promise<import("./auth-state.model").AuthStateModel>;
    check(req: any): Promise<any>;
}
