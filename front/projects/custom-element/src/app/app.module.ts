import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { MyGraphToolkitLibModule, MsalSettingsComponent, PresenceListComponent } from 'my-graph-toolkit-lib';

@NgModule({
  imports: [
    MyGraphToolkitLibModule
  ]
})
export class AppModule {

  constructor(private injector: Injector){}

  ngDoBootstrap(): void {

    const settingElement = createCustomElement(MsalSettingsComponent, { injector: this.injector });
    customElements.define('mygtk-msal-settings', settingElement);

    const presenceElement = createCustomElement(PresenceListComponent, { injector: this.injector });
    customElements.define('mygtk-presence-list', presenceElement);

  }

}
