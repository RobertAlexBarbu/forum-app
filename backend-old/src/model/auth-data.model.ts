import {SessionDataModel} from "./session-data.model";

export interface AuthDataModel extends SessionDataModel {
    passwordHash: string,
    passwordSalt: string,
}