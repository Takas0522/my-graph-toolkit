import { NgModule } from '@angular/core';
import { MsalSettingsComponent } from './msal-settings/msal-settings.component';
import { MsalService } from './msal/msal.service';
import { PresenceListComponent } from './presence-list/presence-list.component';
import { PresenceComponent } from './presence-list/presence/presence.component';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { PresenceListService } from './presence-list/presence-list.service';

@NgModule({
  declarations: [
    MsalSettingsComponent,
    PresenceListComponent,
    PresenceComponent
  ],
  imports: [
    MaterialModule,
    CommonModule
  ],
  providers: [
    MsalService,
    PresenceListService
  ],
  exports: [
    MsalSettingsComponent,
    PresenceListComponent
  ]
})
export class MyGraphToolkitLibModule { }
