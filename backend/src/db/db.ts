import {knex} from "knex";
import {dbConfig} from "./db.config";

export const db = knex(dbConfig.development);