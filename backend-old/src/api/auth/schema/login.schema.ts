import {JSONSchemaType} from "ajv";
import {LoginModel} from "../model/login.model";

export const LoginSchema: JSONSchemaType<LoginModel> = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      maxLength: 32
    },
    password: {
      type: 'string',
      maxLength: 10000
    }
  },
  required: ['username', 'password'],
  additionalProperties: false,
}