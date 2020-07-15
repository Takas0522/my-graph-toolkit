import { Injectable } from '@angular/core';
import { UserAgentApplication, Configuration, Account } from 'msal';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class MsalService {

  private client!: UserAgentApplication;
  private scopes: string[] = [];

  private _isCompleteSettingState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  get isCompleteSettingState$(): Observable<boolean> {
    return this._isCompleteSettingState.asObservable();
  }
  get isCompleteSettingState(): boolean {
    return this._isCompleteSettingState.value;
  }

  constructor() {}

  init(config: Configuration, scopes: string[]): void {
    this.client = new UserAgentApplication(config);
    this.scopes = scopes;
    this.client.handleRedirectCallback((err, res) => {
      console.log({handleCallback: err});
      console.log({handleCallback: res});
    });
    console.log('next')
    this._isCompleteSettingState.next(true);
  }

  login(): void {
    this.client.loginRedirect({ scopes:  this.scopes});
  }

  async aquireToken(): Promise<string> {
    const res = await this.client.acquireTokenSilent({ scopes: this.scopes });
    return res.accessToken;
  }

  getAccount(): Account {
    return this.client.getAccount();
  }
}
