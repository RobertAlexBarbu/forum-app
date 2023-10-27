import {JSONSchemaType} from "ajv";
import {SignupModel} from "../model/signup.model";

export const SignupSchema: JSONSchemaType<SignupModel> = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            maxLength: 32
        },
        email: {
            type: 'string',
            maxLength: 64
        },
        password: {
            type: 'string',
            maxLength: 10000
        }
    },
    required: ['username', 'email', 'password'],
    additionalProperties: false,
}