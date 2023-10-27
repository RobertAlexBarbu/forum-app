import {CryptoService} from "../services/crypto.service";
import {HashedSignupModel} from "./model/hashed-signup.model";
import {SignupModel} from "./model/signup.model";

import {AuthRepository} from "./auth.repository";

export class AuthService {
    private static readonly authRepository = new AuthRepository();

    static async isPasswordValid(password: string,
                                 passwordHash: string,
                                 passwordSalt: string
    ) {
        if (password.length >= 10000) {
            return false;
        }
        const newPasswordHash = await CryptoService.hash(
            password,
            passwordSalt
        );
        return newPasswordHash === passwordHash;
    }

    static async saveSignup(user: SignupModel) {
        const hashedUser = await this.hashSignup(user);
        return await this.authRepository.saveUser(hashedUser);
    }

    static async getUser(username: string) {
        return await this.authRepository.getUserAuthData(username);
    }

    static async hashSignup(signup: SignupModel) {
        const hashedSignupModel :HashedSignupModel = {
            username: '',
            email: '',
            passwordHash: '',
            passwordSalt: '',
            roleId: 1
        };
        hashedSignupModel.username = signup.username;
        hashedSignupModel.email = signup.email;
        hashedSignupModel.passwordSalt = CryptoService.generateSalt(64);
        hashedSignupModel.passwordHash = await CryptoService.hash(
            signup.password as string,
            hashedSignupModel.passwordSalt as string
        );
        return hashedSignupModel;
    }

}