import {EnvironmentService} from "../../services/EnvironmentService";
import expressSession from "express-session";
import {sessionStore} from "./sessionStore.js";

const sessionSecret = EnvironmentService.get('SECRET');

export const sessionMiddleware = expressSession({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60
    }
})