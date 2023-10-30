import express from "express";
import {
    SchemaValidationService
} from "../services/schema-validation.service";

export class schemaValidationError extends Error {

}

export const schemaValidationMiddleware = (validatorName:string ) : express.RequestHandler => {
    return (req, res, next) => {
        const validator = SchemaValidationService.getValidator(validatorName);
        if(validator(req.body)) {
            next();
        } else {
            if(validator.errors != null) {
                console.log(validator.errors);
                next(new Error(validator.errors[0].message));
            } else {
                next(new Error('No errors in schema validation middleware'));
            }
        }
    }
}