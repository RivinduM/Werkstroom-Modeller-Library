import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { InputCircleComponent } from './input-circle/input-circle.component';
import { LineComponent } from './line/line.component';
import {Globals} from './globals';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    InputBoxComponent,
    InputCircleComponent,
    LineComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule
  ],
  providers: [Globals],
  entryComponents: [InputBoxComponent, InputCircleComponent, LineComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
