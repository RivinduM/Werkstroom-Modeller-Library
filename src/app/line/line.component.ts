import {AfterViewInit, Component} from '@angular/core';
import swal from 'sweetalert2';
import {Globals} from '../globals';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements AfterViewInit {
  cid: string;
  color: string;
  connectors = this.globals.connectors;
  compList: any[] = this.globals.compList;

  constructor(private globals: Globals) {
  }

  ngAfterViewInit() {
    document.getElementById(this.cid).style.backgroundColor = this.color;
  }

  delete() {
    swal({
      title: 'Delete the connection?',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#1c0b6e',
      cancelButtonColor: '#3c3c3c',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        const line = this.connectors.find(i => i.id === this.cid);

        const node1 = line.node1;
        const n1Connectors = this.compList.find(i => i.id === node1).connectors;
        const n1Line = n1Connectors.find(i => i.id === this.cid);
        const n1LineIndex = n1Connectors.indexOf(n1Line);
        n1Connectors.splice(n1LineIndex, 1);

        const node2 = line.node2;
        const n2Connectors = this.compList.find(i => i.id === node2).connectors;
        const n2Line = n2Connectors.find(i => i.id === this.cid);
        const n2LineIndex = n2Connectors.indexOf(n2Line);
        n2Connectors.splice(n2LineIndex, 1);

        const index = this.connectors.indexOf(line);
        this.connectors.splice(index, 1);
        document.getElementById(this.cid).remove();
      }
    });
  }

  hoverIn() {
    document.getElementById(this.cid).style.backgroundColor = 'teal';
  }

  hoverOut() {
    document.getElementById(this.cid).style.backgroundColor = (this.color) ? this.color : '#1c0b6e';
  }

}
