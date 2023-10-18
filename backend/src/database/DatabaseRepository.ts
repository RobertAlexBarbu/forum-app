import {database} from "./database";
import decamelizeKeys from 'decamelize-keys';
import camelcaseKeys from "camelcase-keys";

export class DatabaseRepository {
    table: string;
    database = database;

    constructor(table: string) {
        this.table = table;
    }

    insert(entry: any ) {
        return this.database(this.table).returning('id').insert(decamelizeKeys(entry));
    }

    getByID(id: number) {
        return this.database.raw(`
            SELECT * FROM :table:
            WHERE id = :id
        `,
        {
          table: this.table,
          id: id
        }
        ).then((result) => {
            return camelcaseKeys(result.rows[0]);
        })
    }
    getByCol(colName: string, colValue: string) {
        return this.database.raw(`
            SELECT * FROM :table: WHERE :colName: = :colValue 
        `,
            {
                table: this.table,
                colName: colName,
                colValue: colValue,
            }
        ).then((result) => {
            return camelcaseKeys(result.rows[0]);
        })
    }
}