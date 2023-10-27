import Ajv from "ajv";
import {SignupSchema} from "../../auth/schema/signup.schema";
import {LoginSchema} from "../../auth/schema/login.schema";

export const ajv = new Ajv();
ajv.addSchema(SignupSchema, 'signup');
ajv.addSchema(LoginSchema, 'login');