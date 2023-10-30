import Ajv from "ajv";
import {SignupSchema} from "../api/auth/schema/signup.schema";
import {LoginSchema} from "../api/auth/schema/login.schema";

export const ajv = new Ajv();
ajv.addSchema(SignupSchema, 'signup');
ajv.addSchema(LoginSchema, 'login');