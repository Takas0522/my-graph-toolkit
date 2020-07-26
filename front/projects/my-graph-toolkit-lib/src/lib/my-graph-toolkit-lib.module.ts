import { NgModule } from '@angular/core';
import { MsalSettingsComponent } from './msal-settings/msal-settings.component';
import { MsalService } from './msal/msal.service';
import { PresenceListComponent } from './presence-list/presence-list.component';
import { PresenceComponent } from './presence-list/presence/presence.component';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { PresenceListService } from './presence-list/presence-list.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SubscriptionService } from './subscription/subscription.service';

@NgModule({
  declarations: [
    MsalSettingsComponent,
    PresenceListComponent,
    PresenceComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    MsalService,
    PresenceListService,
    SubscriptionService
  ],
  exports: [
    MsalSettingsComponent,
    PresenceListComponent
  ]
})
export class MyGraphToolkitLibModule { }
