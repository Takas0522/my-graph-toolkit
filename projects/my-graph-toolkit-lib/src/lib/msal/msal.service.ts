import { Injectable } from '@angular/core';
import { UserAgentApplication, Configuration, Account } from 'msal';

@Injectable()
export class MsalService {

  private client!: UserAgentApplication;
  private scopes: string[] = [];

  constructor() { }

  init(config: Configuration, scopes: string[]): void {
    this.client = new UserAgentApplication(config);
    this.scopes = scopes;
    this.client.handleRedirectCallback((err, res) => {
      console.log(err);
      console.log(res);
    });
  }

  login(): void {
    this.client.loginRedirect({ scopes:  this.scopes});
  }

  async aquireToken(): Promise<string> {
    const res = await this.client.acquireTokenSilent({ scopes: this.scopes});
    return res.accessToken;
  }

  getAccount(): Account {
    return this.client.getAccount();
  }
}
