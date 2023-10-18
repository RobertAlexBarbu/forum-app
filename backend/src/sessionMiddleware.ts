import {EnvironmentService} from "./EnvironmentService";
import connectSessionKnex from "connect-session-knex";
import expressSession from "express-session";
import {database} from "./database/database";

const sessionSecret = EnvironmentService.get('SECRET');
const SessionStore = connectSessionKnex(expressSession);

const sessionStore = new SessionStore({
    // @ts-ignore
    knex: database,
    clearInterval: 50
})
export const sessionMiddleware = expressSession({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60
    }
})