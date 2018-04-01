import {AfterViewInit, ApplicationRef, Component, ComponentFactoryResolver, EmbeddedViewRef, Injector, OnInit} from '@angular/core';
import {v4 as uuid} from 'uuid';
import swal from 'sweetalert2';
import {Globals} from '../globals';
import {LineComponent} from '../line/line.component';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css'],

})
export class InputBoxComponent implements OnInit, AfterViewInit {
  cid: string;
  showcntrl: string;
  cntrl: string;
  headId: string;
  bodyId: string;
  title = '';
  body = '';
  compList = this.globals.compList;
  connectors = this.globals.connectors;
  dragStartX = null;
  dragStartY = null;
  componentColor: string;
  componentHead: string;
  componentHeadTxt: string;
  componentBodyTxt: string;
  lineColor: string;
  private currentX: number;
  private currentY: number;

  constructor(private globals: Globals,
              private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {
  }

  /**
   * setting custom properties
   */
  ngAfterViewInit() {
    if (document.getElementById(this.cid)) {
      document.getElementById(this.cid).style.background = this.componentColor;
      document.getElementById(this.headId).style.background = this.componentHead;
      document.getElementById(this.headId).style.color = this.componentHeadTxt;
      document.getElementById(this.bodyId).style.color = this.componentBodyTxt;
    }
  }

  /**
   * @desc set modal header and body text on initialization
   */
  ngOnInit() {
    const newElement = (!this.compList.find(i => i.id === this.cid));
    if (newElement) {
      swal.setDefaults({
        input: 'text',
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2'],
        allowOutsideClick: false
      });

      const steps = [
        {
          title: 'Modal Header',
          text: 'Enter title of the box'
        },
        'Modal Body'
      ];

      swal.queue(steps).then((result) => {
        swal.resetDefaults();
        if (result.value) {
          this.title = result.value[0];
          this.body = result.value[1];
          this.addToList();
        }
      });
    }
  }

  /**
   * @desc add component to component list
   */
  addToList() {
    const comp = {
      id: this.cid, type: 'Box', x: 250, y: 60, title: this.title,
      body: this.body, height: 200, width: 250, z: 1000, connectors: [], neighbors: []
    };
    this.compList.push(comp);
  }

  /**
   * @desc move component
   * @param ev
   */
  moveElement(ev) {
    ev.preventDefault();
    const element = document.getElementById(this.cid);
    element.style.position = 'absolute';
    if (isNaN(parseInt((element.style.left), 10))) {
      this.currentX = 0;
    } else {
      this.currentX = parseInt((element.style.left), 10);
    }
    if (isNaN(parseInt((element.style.top), 10))) {
      this.currentY = 0;
    } else {
      this.currentY = parseInt((element.style.top), 10);
    }
    const deltaX = this.currentX + Number(ev.screenX) - this.dragStartX;
    const deltaY = this.currentY + Number(ev.screenY) - this.dragStartY;
    this.dragStartX = null;
    this.dragStartY = null;
    element.style.left = deltaX + 'px';
    element.style.top = deltaY + 'px';
    const component = this.compList.find(i => i.id === this.cid);
    component.x = document.getElementById(this.cid).getBoundingClientRect().left;
    component.y = document.getElementById(this.cid).getBoundingClientRect().top;
    setTimeout(this.moveConnectors(), 10);
  }

  /**
   * @desc set data in drag event
   * @param ev
   */
  setData(ev) {
    ev.dataTransfer.setData('text', this.cid);
    this.dragStartX = ev.screenX;
    this.dragStartY = ev.screenY;
  }

  /**
   * @desc increase z index of component
   */
  bringToFront() {
    const currentZ = window.getComputedStyle(document.getElementById(this.cid), null).getPropertyValue('z-index');
    const zIndent = Number(currentZ) + 1;
    document.getElementById(this.cid).style.zIndex = zIndent + '';
  }

  /**
   * @desc decrease z index of component
   */
  sendToBack() {
    const currentZ = window.getComputedStyle(document.getElementById(this.cid), null).getPropertyValue('z-index');
    const zIndent = Number(currentZ) - 1;
    document.getElementById(this.cid).style.zIndex = zIndent + '';
  }

  /**
   *@desc show control icons
   */
  showControls() {
    document.getElementById(this.cntrl).style.display = 'block';
    document.getElementById(this.showcntrl).style.display = 'none';
  }

  /**
   * @desc hide control icons
   */
  hideControls() {
    document.getElementById(this.cntrl).style.display = 'none';
    document.getElementById(this.showcntrl).style.display = 'block';
  }

  /**
   * @desc confirm & delete component
   */
  delete() {
    swal({
      title: 'Are you sure?',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#1c0b6e',
      cancelButtonColor: '#3c3c3c',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        document.getElementById(this.cid).remove();
        const component = this.compList.find(i => i.id === this.cid);
        for (const neighbor of component.neighbors) {
          const neighborEle = this.compList.find(i => i.id === neighbor).neighbors;
          const nIndex = neighborEle.indexOf(this.cid);
          neighborEle.splice(nIndex, 1);
        }

        for (const line of component.connectors) {
          console.log('line *** ' + line);
          for (let i = 0; i < this.connectors.length; i++) {
            if (this.connectors[i].id === line) {

              const node1 = (this.connectors[i].node1 === this.cid) ? this.connectors[i].node2 : this.connectors[i].node1;
              const n1Connectors = this.compList.find(j => j.id === node1).connectors;
              const n1LineIndex = n1Connectors.indexOf(line);
              if (n1LineIndex !== -1) {
                n1Connectors.splice(n1LineIndex, 1);
              }

              this.connectors.splice(i, 1);
              document.getElementById(line).remove();
              i--;
              break;
            }
          }
        }
        const index = this.compList.indexOf(component);
        this.compList.splice(index, 1);
      }
    });
  }

  /**
   * @desc edit modal header and body text
   */
  edit() {
    swal.setDefaults({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2'],
      allowOutsideClick: false
    });

    const steps = [
      {
        title: 'Modal Header',
        text: 'Enter title of the box',
        inputValue: this.title
      },
      {
        title: 'Modal Body',
        inputValue: this.body
      }
    ];

    swal.queue(steps).then((result) => {
      swal.resetDefaults();
      if (result.value) {
        this.title = result.value[0];
        this.body = result.value[1];
        const component = this.compList.find(i => i.id === this.cid);
        component.title = this.title;
        component.body = this.body;
      }
    });
  }

  /**
   * @desc allow drop of elements
   * @param ev
   */
  allowDrop(ev) {
    ev.preventDefault();
  }

  /**
   * @desc connect 2 components by line
   * @param ev
   */
  connect(ev) {
    ev.preventDefault();
    const prevNode = ev.dataTransfer.getData('text');
    const curNode = this.cid;
    const id = uuid();
    this.drawLine(prevNode, curNode, true, id);
  }

  /**
   * @desc drawing line & updating lists
   * @param prevNode
   * @param curNode
   * @param newConnection
   * @param id
   */
  drawLine(prevNode, curNode, newConnection, id) {
    let leftNode: string;
    let rightNode: string;
    const lineId = id;
    if (curNode !== prevNode) {
      // setting left and right nodes
      if (document.getElementById(prevNode).getBoundingClientRect().left < document.getElementById(curNode).getBoundingClientRect().left) {
        leftNode = prevNode;
        rightNode = curNode;
      } else {
        leftNode = curNode;
        rightNode = prevNode;
      }

      // generating line
      const componentRef = this.componentFactoryResolver.resolveComponentFactory(LineComponent).create(this.injector);
      componentRef.instance.cid = lineId;
      componentRef.instance.color = this.lineColor;
      this.appRef.attachView(componentRef.hostView);
      const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

      const leftNodeElm = this.compList.find(i => i.id === leftNode);
      const rightNodeElm = this.compList.find(i => i.id === rightNode);
      const lineLeftX = leftNodeElm.x + (leftNodeElm.width / 2);
      const lineLeftY = document.getElementById(leftNode).getBoundingClientRect().bottom - leftNodeElm.height / 2;
      const lineRightX = rightNodeElm.x + (rightNodeElm.width / 2);
      const lineRightY = document.getElementById(rightNode).getBoundingClientRect().bottom - rightNodeElm.height / 2;

      // calculating line length and angle
      const xDist = lineRightX - lineLeftX;
      const yDist = lineRightY - lineLeftY;
      const hypo = Math.sqrt((Math.pow(xDist, 2) + Math.pow(yDist, 2)));
      const angleRad = Math.atan(yDist / xDist);
      const angleDeg = angleRad * 180 / Math.PI;

      domElem.style.position = 'absolute';
      const adjustment = angleDeg * 3;

      // setting line left position
      const scroll = this.getScroll();
      const workspaceX = document.getElementById('workspace').getBoundingClientRect().left;
      const workspaceY = document.getElementById('workspace').getBoundingClientRect().top;
      domElem.style.left = lineLeftX + scroll[0] - workspaceX - Math.abs(adjustment) + 'px';
      domElem.style.top = lineLeftY + scroll[1] - workspaceY + adjustment + 'px';

      // adding to canvas, set width and transformation
      const canvas = document.getElementById('canvas');
      canvas.appendChild(domElem);
      setTimeout(function () {
        if (document.getElementById(lineId)) {
          const newLine = document.getElementById(lineId);
          newLine.style.width = hypo + 'px';
          newLine.style.transform = 'rotate(' + angleDeg + 'deg)';
        }
      }, 10);

      // adding connector to components in the list
      const leftEle = this.compList.find(i => i.id === leftNode);
      const rightEle = this.compList.find(i => i.id === rightNode);

      if (newConnection) {
        leftEle.connectors.push(lineId);
        rightEle.connectors.push(lineId);
        leftEle.neighbors.push(rightNode);
        rightEle.neighbors.push(leftNode);
        const line = {id: lineId, node1: leftNode, node2: rightNode};
        this.connectors.push(line);
      }
    }
  }

  /**
   * @desc move connected lines
   */
  moveConnectors() {
    const lines = this.compList.find(i => i.id === this.cid).connectors;
    const num = lines.length;
    for (let i = 0; i < num; i++) {
      const line = lines[i];
      document.getElementById(line).remove();
      const connection = this.connectors.find(j => j.id === line);
      const node = (connection.node1 === this.cid) ? connection.node2 : connection.node1;
      this.drawLine(this.cid, node, false, line);
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
