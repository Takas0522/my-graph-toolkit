import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MyGraphToolkitLibModule } from '../../../my-graph-toolkit-lib/src/lib/my-graph-toolkit-lib.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MyGraphToolkitLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
