import {CryptoService} from "../../services/crypto.service";
import {HashedSignupModel} from "./model/hashed-signup.model";
import {SignupModel} from "./model/signup.model";
import {AuthRepository} from "./auth.repository";
import express, {NextFunction} from "express";

export class AuthService {
  private static readonly authRepository = new AuthRepository();

  static getUser(usernameOrEmail: string) {
    return this.authRepository.getUserAuthData(usernameOrEmail);
  }

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


  static async signup(req: express.Request, res: express.Response, next: NextFunction) {
    try {
      const exists = await AuthService.userExists(req.body);
      if (exists) {
        res.statusCode = 400;
        res.statusMessage = "Username or email already registered";
        res.send();
      } else {
        await AuthService.saveSignup(req.body);
        next();
      }
    } catch (err) {
      next(err);
    }
  }

  static async saveSignup(user: SignupModel) {
    const hashedUser = await this.hashSignup(user);
    return this.authRepository.saveUser(hashedUser);
  }

  static async userExists(user: SignupModel) {
    const exists = await this.authRepository.getUserByEmailAndUsername(user.username,
      user.email);
    return !!exists;
  }

  static async hashSignup(signup: SignupModel) {
    const hashedSignupModel: HashedSignupModel = {
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