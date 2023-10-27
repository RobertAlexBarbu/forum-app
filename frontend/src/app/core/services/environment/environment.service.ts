import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {JsonValue} from "type-fest";
import {endpoints} from "../../../../environments/endpoints";

@Injectable({
    providedIn: 'root'
})
export class EnvironmentService {

    getEnvironmentVar(environmentVarName: string): JsonValue {
        if (environment === undefined) {
            throw new Error('Environment undefined');
        }
        if (environment[environmentVarName] === undefined) {
            throw new Error('Environment variable does not exist: ' + environmentVarName);
        }
        return environment[environmentVarName];
    }

    getEndpoint(endpointName: string): string {
        if (endpoints === undefined) {
            throw new Error('Environment undefined');
        }
        if (typeof endpoints[endpointName] !== 'string') {
            throw new Error('Invalid endpoint: ' + endpointName);
        }
        let scheme = this.getEnvironmentVar('scheme');
        let domain = this.getEnvironmentVar('domain');
        let port = this.getEnvironmentVar('port');
        let endpointUrl = endpoints[endpointName];
        return `${scheme}://${domain}:${port}/${endpointUrl}`;
    }

    constructor() {
    }
}
