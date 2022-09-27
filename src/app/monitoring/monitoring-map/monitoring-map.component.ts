import {Component, Input, OnInit} from '@angular/core';
import {Monitoring, MonitoringMapData, MonitoringService} from '../monitoring.service';
import {MapDirectionsService} from '@angular/google-maps';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-monitoring-map',
  templateUrl: './monitoring-map.component.html',
  styleUrls: ['./monitoring-map.component.css']
})
export class MonitoringMapComponent implements OnInit {
  @Input() item: Monitoring;

  details: MonitoringMapData;
  center: google.maps.LatLngLiteral;
  directionsResult: Observable<google.maps.DirectionsResult | undefined>;

  constructor(
    private service: MonitoringService,
    private mapDirectionsService: MapDirectionsService,
  ) { }

  ngOnInit(): void {
    this.center = {
      lat: 40.7128,
      lng: -74.0060,
    };

    this.details = this.service.getMapData(this.item.id);
    const directionsRequest = {
      origin: this.details.directions.origin,
      destination: this.details.directions.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };
    this.directionsResult = this.mapDirectionsService.route(directionsRequest).pipe(
      map(response => response.result),
    );
  }

}
