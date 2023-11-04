
import {UsersRepository} from "./users.repository";
import express, {NextFunction} from "express";
import {SignupModel} from "./model/signup.model";
import {HashedSignupModel} from "./model/hashed-signup.model";
import {CryptoService} from "../../services/crypto.service";

export class UsersService {
    private static usersRepository = new UsersRepository();
    static getAll = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            const users = await this.usersRepository.getAll();
            res.send(users);
        } catch(err) {
            next(err);
        }

    }

    static signup = async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            const exists = await this.userExists(req.body);
            if (exists) {
                res.statusCode = 400;
                res.statusMessage = "Username or email already registered";
                res.send();
            } else {
                await this.registerUser(req.body);
                next();
            }
        } catch (err) {
            next(err);
        }
    }

    static registerUser = async (user: SignupModel) => {
        const hashedUser = await this.hashUser(user);
        return this.usersRepository.saveUser(hashedUser);
    }

    static userExists = async (user: SignupModel) => {
        const exists = await this.usersRepository.getUserByEmailAndUsername(user.username,
          user.email);
        return !!exists;
    }

    static hashUser = async (signup: SignupModel) => {
        const hashedSignupModel: HashedSignupModel = {
            username: '',
            email: '',
            passwordHash: '',
            passwordSalt: '',
            roleId: 2
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