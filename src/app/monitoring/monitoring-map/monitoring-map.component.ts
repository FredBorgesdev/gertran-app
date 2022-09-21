import {Component, Input, OnInit} from '@angular/core';
import {Monitoring, MonitoringMapData, MonitoringService} from '../monitoring.service';

@Component({
  selector: 'app-monitoring-map',
  templateUrl: './monitoring-map.component.html',
  styleUrls: ['./monitoring-map.component.css']
})
export class MonitoringMapComponent implements OnInit {
  @Input() item: Monitoring;

  details: MonitoringMapData;
  center: google.maps.LatLngLiteral;

  constructor(private service: MonitoringService) { }

  ngOnInit(): void {
    this.center = {
      lat: 40.7128,
      lng: -74.0060,
    };

    this.details = this.service.getMapData(this.item.id);
  }

}
