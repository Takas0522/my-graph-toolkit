import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MsalSettingsComponent } from 'projects/my-graph-toolkit-lib/src/lib/msal-settings/msal-settings.component';
import { Configuration } from 'msal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild(MsalSettingsComponent)
  private msalSettingComp!: MsalSettingsComponent;

  ngAfterViewInit(): void {
    const config: Configuration = {
      auth: {
        clientId: 'e2e6a50b-ab91-4566-9aac-b17e9e12480b',
        authority: 'https://login.microsoftonline.com/8819a950-d174-4508-a86d-cddabbafb14a',
        redirectUri: 'http://localhost:4200'
      }
    };
    const scopes: string[] = ['User.Read.All', 'Presence.Read.All'];
    this.msalSettingComp.msalSettings = {config, scopes};
    if (!this.msalSettingComp.account()) {
      this.msalSettingComp.loginRedirect();
    }
    console.log(this.msalSettingComp.account());
  }
}
