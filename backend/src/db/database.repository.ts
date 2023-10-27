import {db} from "./db";
import {JsonObject} from "type-fest";
import {
    CamelcaseService
} from "../services/camelcase.service";

export abstract class DatabaseRepository {
    abstract table: string;
    database = db;
}

