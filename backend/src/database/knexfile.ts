import type { Knex } from "knex";
import {databaseConfig} from "./databaseConfig";

// Migrations settings

export const config: { [key: string]: Knex.Config } = databaseConfig

module.exports = config;
