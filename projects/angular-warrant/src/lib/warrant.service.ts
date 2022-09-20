import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WarrantConfiguration } from './warrant.config';
import { WarrantConfigurationService } from './warrant.config.token';

@Injectable({
  providedIn: 'root',
})
export class WarrantService {
  constructor(private http: HttpClient, @Inject(WarrantConfigurationService) private warrantConfiguration: WarrantConfiguration) {}

  isAuthorized(op: string, warrants: Array<any>) {
    return this.http.post<any>(
      'https://api.warrant.dev/v2/authorize',
      { op: op, warrants: warrants },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `ApiKey ${this.warrantConfiguration.clientKey}`,
        }),
      }
    );
  }
}
