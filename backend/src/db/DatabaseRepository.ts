import {db} from "./db";
import {JsonObject} from "type-fest";
import {CamelcaseService} from "../services/CamelcaseService";

export class DatabaseRepository {
    table: string;
    database = db;

    constructor(table: string) {
        this.table = table;
    }

    save(entry: JsonObject) {
        return this.database(this.table).returning('id').insert(CamelcaseService.decamelize(entry));
    }

    async getByID(id: number, ...columns: string[]) {
        const result = await this.database(this.table).where('id', id).select(...columns).limit(1);
        return CamelcaseService.camelize(result[0]);
    }

    async getByCol(colName: string, colValue: string, ...columns: string[]) {
        let result = await this.database(this.table).where(colName, colValue).select(...columns).limit(1)
        return CamelcaseService.camelize(result[0]);
    }
}