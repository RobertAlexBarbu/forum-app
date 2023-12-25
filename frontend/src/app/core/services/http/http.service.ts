import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  http = inject(HttpClient);
  environmentService = inject(EnvironmentService);
  httpOptions = {
    withCredentials: true
  };
  scheme = this.environmentService.getEnvironmentVar('scheme');
  domain = this.environmentService.getEnvironmentVar('domain');
  port = this.environmentService.getEnvironmentVar('port');
  server = `${this.scheme}://${this.domain}:${this.port}`;

  post<T>(url: string, body: T | {} = {}) {
    return this.http.post<T>(`${this.server}/${url}`, body, this.httpOptions);
  }

  put<T>(url: string, body: T) {
    return this.http.put<T>(`${this.server}/${url}`, body, this.httpOptions);
  }

  putByID<T>(url: string, body: T, id: string | number) {
    return this.http.put<T>(
      `${this.server}/${url}/${id}`,
      body,
      this.httpOptions
    );
  }

  delete<T>(url: string) {
    return this.http.delete<T>(`${this.server}/${url}`, this.httpOptions);
  }

  deleteByID<T>(url: string, id: string | number) {
    return this.http.delete<T>(`${this.server}/${url}/${id}`, this.httpOptions);
  }

  get<T>(url: string) {
    return this.http.get<T>(`${this.server}/${url}`, this.httpOptions);
  }

  getByID<T>(url: string, id: string | number) {
    return this.http.get<T>(`${this.server}/${url}/${id}`, this.httpOptions);
  }
}
