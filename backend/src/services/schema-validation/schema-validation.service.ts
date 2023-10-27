import {ajv} from "./ajv.config";

export class SchemaValidationService {
    static getValidator(validatorName: string) {
        const validator = ajv.getSchema(validatorName);
        if(validator === undefined) {
            throw new Error(`Validator does not exist: ${validatorName}; Add schema validators to ajv.config.ts`);
        }
        return validator;
    }
}
