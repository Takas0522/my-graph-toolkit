import { Component, OnInit, Input } from '@angular/core';
import { MsalService } from '../msal/msal.service';
import { Configuration, Account } from 'msal';

@Component({
  selector: 'mygtk-msal-settings',
  template: 'a'
})
export class MsalSettingsComponent {

  constructor(
    private msalService: MsalService
  ) {}

  @Input()
  set msalSettings(conf: {config: Configuration, scopes: string[]}) {
    console.log({msalSettings: conf})
    this.msalService.init(conf.config, conf.scopes);
  }
  @Input()
  set dummyStSet(val: string) {
    console.log({dummySet: val})
  }

  account(): Account {
    return this.msalService.getAccount();
  }

  loginRedirect(): void {
    this.msalService.login();
  }

}
