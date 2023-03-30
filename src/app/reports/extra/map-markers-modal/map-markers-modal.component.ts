import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-map-markers-modal',
  templateUrl: './map-markers-modal.component.html',
  styleUrls: ['./map-markers-modal.component.css']
})
export class MapMarkersModalComponent implements OnInit {
  @Input() markers: any[];
  @Input() mapCenter: any;

  constructor() { }

  ngOnInit(): void {
  }

}
