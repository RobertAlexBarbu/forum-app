import {EnvironmentService} from "../services/environment.service";
import expressSession from "express-session";
import connectSessionKnex from "connect-session-knex";
import {db} from "../db/db";

const SessionStore = connectSessionKnex(expressSession);

const sessionStore = new SessionStore({
    knex: db,
    clearInterval: 5000
})

const sessionSecret = EnvironmentService.get('SECRET');

export const sessionMiddleware = expressSession({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    rolling: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 4,
        httpOnly: true,
        // sameSite: "none",
        secure: false // can be true only when using https
    }
})