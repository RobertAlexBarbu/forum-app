import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { JsonValue } from 'type-fest';
import { endpoints } from '../../../../environments/endpoints';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  getEnvironmentVar(environmentVarName: string): JsonValue {
    if (environment === undefined) {
      throw new Error('Environment undefined');
    }
    if (environment[environmentVarName] === undefined) {
      throw new Error(
        'Environment variable does not exist: ' + environmentVarName
      );
    }
    return environment[environmentVarName];
  }

  getUrl(endpointName: string): string {
    if (endpoints === undefined) {
      throw new Error('Environment undefined');
    }
    if (typeof endpoints[endpointName] !== 'string') {
      throw new Error('Invalid endpoint: ' + endpointName);
    }
    const scheme = this.getEnvironmentVar('scheme');
    const domain = this.getEnvironmentVar('domain');
    const port = this.getEnvironmentVar('port');
    const endpointUrl = endpoints[endpointName];
    return `${scheme}://${domain}:${port}/${endpointUrl}`;
  }
}
