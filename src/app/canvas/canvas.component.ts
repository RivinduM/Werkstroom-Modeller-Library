import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  EmbeddedViewRef,
  Injector,
  OnInit,
  NgModule, Input
} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {InputBoxComponent} from '../input-box/input-box.component';
import {InputCircleComponent} from '../input-circle/input-circle.component';
import {Globals} from '../globals';
import {v4 as uuid} from 'uuid';

@NgModule({
  imports: [NgbModule]
})

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})

export class CanvasComponent implements OnInit {
  compList: any[] = this.globals.compList;
  connectors = this.globals.connectors;


  @Input() backColor: string;
  @Input() toolboxColor: string;
  @Input() toolboxFontColor: string;
  @Input() componentColor: string;
  @Input() paletteHeight: string; // minimum 300
  @Input() paletteWidth: string; // minimum 1000
  @Input() canvasColor: string;
  @Input() componentHeaderColor: string;
  @Input() componentHeadTxt: string;
  @Input() componentBodyTxt: string;
  @Input() lineColor: string;


  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector,
              private globals: Globals) {
  }

  /**
   * setting custom properties
   */
  ngOnInit() {
    document.getElementById('workspace').scrollTo(0, 178);

    document.getElementById('palette').style.background = this.backColor;
    document.getElementById('icon-bar').style.background = this.toolboxColor;
    document.getElementById('icon-bar').style.color = this.toolboxFontColor;
    document.getElementById('boxModal').style.background = this.componentColor;
    document.getElementById('circleModal').style.background = this.componentColor;
    document.getElementById('palette').style.height = (this.paletteHeight === undefined) ? '500px' : this.paletteHeight;
    document.getElementById('palette').style.width = this.paletteWidth;
    document.getElementById('canvas').style.backgroundColor = this.canvasColor;
    document.getElementById('toolboxBoxHeader').style.backgroundColor = this.componentHeaderColor;
    document.getElementById('toolboxCircleHeader').style.backgroundColor = this.componentHeaderColor;
    document.getElementById('toolboxBoxHeader').style.color = this.componentHeadTxt;
    document.getElementById('toolboxCircleHeader').style.color = this.componentHeadTxt;
    document.getElementById('toolboxBoxBody').style.color = this.componentBodyTxt;
    document.getElementById('toolboxCircleBody').style.color = this.componentBodyTxt;
  }

  /**
   * @desc insert components to the canvas
   * @param domElem - type of component to be inserted
   * @param x - x coordinate of position
   * @param y - y coordinate of position
   */
  insertComponent(domElem, x, y) {
    domElem.style.position = 'absolute';
    const scroll = this.getScroll();
    const workspaceX = document.getElementById('workspace').getBoundingClientRect().left;
    const workspaceY = document.getElementById('workspace').getBoundingClientRect().top;
    const xPos = x + scroll[0] - workspaceX - 41;
    const yPos = y + scroll[1] - workspaceY - 105;
    domElem.style.left = xPos + 'px';
    domElem.style.top = yPos + 'px';
    const canvas = document.getElementById('canvas');
    canvas.appendChild(domElem);
  }

  /**
   * @desc prevent default drops
   * @param ev - drop event
   */
  allowDrop(ev) {
    ev.preventDefault();
  }

  /**
   * @desc setting data of drag event
   * @param ev
   */
  drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);

  }

  /**
   * @desc sense drop of toolbox elements & call function to insert component
   * @param ev
   */
  drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const id = uuid();
    switch (data) {
      case 'boxModal': {
        const componentRef = this.componentFactoryResolver.resolveComponentFactory(InputBoxComponent).create(this.injector);
        componentRef.instance.cid = id;
        componentRef.instance.showcntrl = 'showControls' + id;
        componentRef.instance.cntrl = 'controls' + id;
        componentRef.instance.headId = 'head' + id;
        componentRef.instance.bodyId = 'body' + id;
        componentRef.instance.componentColor = this.componentColor;
        componentRef.instance.componentHead = this.componentHeaderColor;
        componentRef.instance.componentHeadTxt = this.componentHeadTxt;
        componentRef.instance.componentBodyTxt = this.componentBodyTxt;
        componentRef.instance.lineColor = this.lineColor;
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.insertComponent(domElem, ev.screenX, ev.screenY);
        break;
      }
      case 'circleModal': {
        const componentRef = this.componentFactoryResolver.resolveComponentFactory(InputCircleComponent).create(this.injector);
        componentRef.instance.cid = id;
        componentRef.instance.showcntrl = 'showControls' + id;
        componentRef.instance.cntrl = 'controls' + id;
        componentRef.instance.headId = 'head' + id;
        componentRef.instance.bodyId = 'body' + id;
        componentRef.instance.circleBody = 'circle' + id;
        componentRef.instance.componentColor = this.componentColor;
        componentRef.instance.componentHead = this.componentHeaderColor;
        componentRef.instance.componentHeadTxt = this.componentHeadTxt;
        componentRef.instance.componentBodyTxt = this.componentBodyTxt;
        componentRef.instance.lineColor = this.lineColor;
        this.appRef.attachView(componentRef.hostView);
        const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.insertComponent(domElem, ev.screenX, ev.screenY);
        break;
      }
    }
  }

  /**
   * @desc update component array details
   */
  updateList() {
    for (const comp of this.compList) {
      if (document.getElementById(comp.id)) {
        const component = document.getElementById(comp.id);
        comp.x = component.getBoundingClientRect().left;
        comp.y = component.getBoundingClientRect().top + 65;
        comp.height = component.getBoundingClientRect().height;
        comp.width = component.getBoundingClientRect().width;
        comp.z = component.style.zIndex;
      }
    }
  }

  /**
   * @desc get amount of scroll of the workspace and returns scroll amount [x,y]
   * @returns {number[]}
   */
  getScroll() {
    const elmnt = document.getElementById('workspace');
    const x = elmnt.scrollLeft;
    const y = elmnt.scrollTop;
    return [x, y];
  }
}


