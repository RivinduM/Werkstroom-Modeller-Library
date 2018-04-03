import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CanvasComponent} from './canvas.component';
import {InputBoxComponent} from '../input-box/input-box.component';
import {InputCircleComponent} from '../input-circle/input-circle.component';
import {LineComponent} from '../line/line.component';
import {Globals} from '../globals';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
  ],
  declarations: [
    InputCircleComponent,
    InputBoxComponent,
    LineComponent
  ],
  exports: [
    InputCircleComponent,
    InputBoxComponent,
    LineComponent,
    CanvasComponent,
    AngularFontAwesomeModule
  ],
  entryComponents: [InputBoxComponent, InputCircleComponent, LineComponent],
  providers: [
    Globals
  ]
})
export class CanvasModule {
}
