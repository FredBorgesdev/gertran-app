import {Component, Input, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {PersonalPosition} from '../positions.service';

@Component({
  selector: 'monitoring-personal-map',
  templateUrl: './monitoring-personal-map.component.html',
  styleUrls: ['./monitoring-personal-map.component.css']
})
export class PersonalMonitoringMapComponent implements OnInit {
  @Input() item: PersonalPosition;

  bounds = null;
  personalLocation = null;

  constructor(

  ) {
  }

  ngOnInit(): void {
    this.personalLocation = [this.item.longitude, this.item.latitude];

        this.bounds = new mapboxgl.LngLatBounds(
          this.personalLocation,
          this.personalLocation,
        );

  }
}
