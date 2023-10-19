import connectSessionKnex from "connect-session-knex";
import expressSession from "express-session";
import {database} from "../database/database";

const SessionStore = connectSessionKnex(expressSession);

export const sessionStore = new SessionStore({
    // @ts-ignore
    knex: database,
    clearInterval: 50
})