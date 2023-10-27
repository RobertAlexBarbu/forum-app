import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {JsonObject} from "type-fest";
import {EnvironmentService} from "../environment/environment.service";

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    http = inject(HttpClient);
    environmentService = inject(EnvironmentService);
    httpOptions = {
        withCredentials: true
    }

    constructor() {
    }

    save<R>(endpointName: string, body: JsonObject) {
        const endpointUrl = this.environmentService.getEndpoint(endpointName);
        return this.http.post<R>(endpointUrl, body, this.httpOptions);
    }

    get<T>(endpointName: string) {
        const endpointUrl = this.environmentService.getEndpoint(endpointName);
        return this.http.get<T>(endpointUrl, this.httpOptions);
    }

    getByID<T>(endpointName: string, id: string | number) {
        const endpointUrl = this.environmentService.getEndpoint(endpointName);
        return this.http.get<T>(`${endpointUrl}/${id}`, this.httpOptions);
    }
}
