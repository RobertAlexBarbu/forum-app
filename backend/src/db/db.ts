import {knex} from "knex";
import {dbConfig} from "./db.config";
const knexStringcase = require('knex-stringcase');

// export const db = knex(dbConfig.development);
console.log(dbConfig.development);
console.log(knexStringcase(dbConfig.development));
export const db = knex(knexStringcase(dbConfig.development))