import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-tv1',
  templateUrl: './tv1.component.html',
  styleUrls: ['./tv1.component.css']
})
export class Tv1Component {
  @Input() hideHeader = false;

  constructor() {
  }

}
