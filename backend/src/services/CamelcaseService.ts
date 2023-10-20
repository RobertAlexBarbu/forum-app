import {JsonObject} from "type-fest";
import camelcaseKeys from "camelcase-keys";
import decamelcaseKeys from "decamelcase-keys";


export class CamelcaseService {
    static camelize(snakeCaseObject: JsonObject) {
        const aux = {...snakeCaseObject};
        return camelcaseKeys(aux);
    }

    static decamelize(camelCaseObject: JsonObject) {
        const aux = {...camelCaseObject};
        return decamelcaseKeys(aux);
    }
}