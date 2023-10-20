import {knex} from "knex";
import {dbConfig} from "./dbConfig";

export const db = knex(dbConfig.development);