import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import {CanvasModule} from './canvas/canvas.module';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    CanvasModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
