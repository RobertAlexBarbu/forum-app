import connectSessionKnex from "connect-session-knex";
import expressSession from "express-session";
import {db} from "../../db/db";


const SessionStore = connectSessionKnex(expressSession);

export const sessionStore = new SessionStore({
    knex: db,
    clearInterval: 50
})