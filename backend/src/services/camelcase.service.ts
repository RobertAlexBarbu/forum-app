import {JsonObject} from "type-fest";
import camelcaseKeys from "camelcase-keys";
import decamelcaseKeys from "decamelcase-keys";


export class CamelcaseService {
    static camelize(snakeCaseObject: JsonObject) {
        const aux = {...snakeCaseObject};
        return camelcaseKeys(aux) as JsonObject;
    }
    static camelizeArray(snakeCaseObjects: JsonObject[]) {
        return snakeCaseObjects.map(obj => this.camelize(obj)) as JsonObject[];
    }

    static decamelize(camelCaseObject: JsonObject) {
        const aux = {...camelCaseObject};
        return decamelcaseKeys(aux) as JsonObject;
    }
}