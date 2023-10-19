import {knex} from "knex";
import {databaseConfig} from "./databaseConfig";

export const database = knex(databaseConfig.development);