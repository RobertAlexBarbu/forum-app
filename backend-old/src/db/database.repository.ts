import {db} from "./db";

export abstract class DatabaseRepository {
    abstract table: string;
    protected database = db;
}

