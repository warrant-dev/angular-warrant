import { Inject, Injectable } from '@angular/core';
import { WarrantConfiguration } from './warrant.config';
import { WarrantConfigurationService } from './warrant.config.token';
import { Client as WarrantClient, WarrantCheck } from '@warrantdev/warrant-js';

const LOCAL_STORAGE_KEY_SESSION_TOKEN = "__warrantSessionToken";

@Injectable({
  providedIn: 'root',
})
export class WarrantService {
  sessionToken: string = '';

  constructor(@Inject(WarrantConfigurationService) private warrantConfiguration: WarrantConfiguration) {}

  async isAuthorized(warrantCheck: WarrantCheck) {
    this.getSessionToken();

    if (!this.sessionToken) {
      throw new Error("No session token provided to Warrant. You may have forgotten to call setSessionToken with a valid session token to finish initializing Warrant.");
    }

    return await new WarrantClient(this.warrantConfiguration.clientKey, this.sessionToken).isAuthorized(warrantCheck);
  }

  getSessionToken() {
    const savedSessionToken = localStorage.getItem(LOCAL_STORAGE_KEY_SESSION_TOKEN);
    if (savedSessionToken) {
      this.setSessionToken(savedSessionToken);
    }
  }

  setSessionToken(newSessionToken: string) {
    this.sessionToken = newSessionToken;

    localStorage.setItem(LOCAL_STORAGE_KEY_SESSION_TOKEN, newSessionToken);
  }
}
