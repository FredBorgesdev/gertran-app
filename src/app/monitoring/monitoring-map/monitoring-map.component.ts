import {Component, Input, OnInit} from '@angular/core';
import {Monitoring, MonitoringMapData, MonitoringService} from '../monitoring.service';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import polyline from '@mapbox/polyline';
import {environment} from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import {Position} from '../positions.service';
import {MonitoringRequestsService} from '../../monitoring-requests/monitoring-requests.service';

@Component({
  selector: 'app-monitoring-map',
  templateUrl: './monitoring-map.component.html',
  styleUrls: ['./monitoring-map.component.css']
})
export class MonitoringMapComponent implements OnInit {
  @Input() item: Position;

  details: MonitoringMapData;

  bounds = null;
  directionsGeoJson: any;
  driverLocation = null;

  constructor(
    private service: MonitoringService,
    private monitoringRequestService: MonitoringRequestsService,
  ) { }

  ngOnInit(): void {
    this.driverLocation = [this.item.longitude, this.item.latitude];
    this.monitoringRequestService.get(this.item.monitoringRequest.id).subscribe(({ routeCoordinates }) => {
      this.directionsGeoJson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: routeCoordinates
        }
      };
      this.bounds = new mapboxgl.LngLatBounds(
        this.driverLocation,
        routeCoordinates[routeCoordinates.length - 1]
      );
    });
  }

    // const directionsRequest = {
    //   origin: this.details.directions.origin,
    //   destination: this.details.directions.destination,
    //   travelMode: google.maps.TravelMode.DRIVING,
    // };
    // this.directionsResult = this.mapDirectionsService.route(directionsRequest).pipe(
    //   map(response => response.result),
    // );
}
