import dotenv from "dotenv";

dotenv.config();

export class EnvironmentService {
    static get(name: string) {
        const env = process.env[name];
        if (typeof env !== 'undefined') {
            return env;
        } else {
            throw new Error(`Undefined environment variable: ${name}`);
        }
    }
}