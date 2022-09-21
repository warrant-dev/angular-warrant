import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WarrantConfiguration } from './warrant.config';
import { WarrantConfigurationService } from './warrant.config.token';
import { Client as WarrantClient, WarrantCheck } from '@warrantdev/warrant-js';

const LOCAL_STORAGE_KEY_SESSION_TOKEN = "__warrantSessionToken";

@Injectable({
  providedIn: 'root',
})
export class WarrantService {
  sessionToken: string = '';

  constructor(private http: HttpClient, @Inject(WarrantConfigurationService) private warrantConfiguration: WarrantConfiguration) {}

  async isAuthorized(warrantCheck: WarrantCheck) {
    if (!this.sessionToken) {
      throw new Error("No session token provided to Warrant. You may have forgotten to call setSessionToken with a valid session token to finish initializing Warrant.");
    }

    const isAuthorized = await new WarrantClient(this.warrantConfiguration.clientKey, "sess_prod_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbnZpcm9ubWVudCI6InByb2QiLCJleHAiOjE2NjM4MDI3NzgsIm9yZ2FuaXphdGlvbklkIjoxMjYsInVzZXJJZCI6Ijg2In0.KtlfUa1CkGVLKYokHU1Vp7yUHyIoY6IsEgbZAxhH_gw").isAuthorized(warrantCheck);
    return isAuthorized;
  }

  setSessionToken(newSessionToken: string) {
    this.sessionToken = newSessionToken;

    localStorage.setItem(LOCAL_STORAGE_KEY_SESSION_TOKEN, newSessionToken);
  }
}
