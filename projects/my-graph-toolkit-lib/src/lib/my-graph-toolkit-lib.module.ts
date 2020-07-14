import { NgModule } from '@angular/core';
import { MsalSettingsComponent } from './msal-settings/msal-settings.component';
import { MsalService } from './msal/msal.service';

@NgModule({
  declarations: [
    MsalSettingsComponent
  ],
  imports: [

  ],
  providers: [
    MsalService
  ],
  exports: [
    MsalSettingsComponent
  ]
})
export class MyGraphToolkitLibModule { }
