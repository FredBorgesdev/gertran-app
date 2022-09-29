import {Component, Input, OnInit} from '@angular/core';
import {Monitoring, MonitoringMapData, MonitoringService} from '../monitoring.service';
import {MapDirectionsService} from '@angular/google-maps';
import {Observable} from 'rxjs';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import polyline from '@mapbox/polyline';
import {environment} from '../../../environments/environment';

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
  directionsGeoJson: any;

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

    const directions = new MapboxDirections({
      accessToken: environment.mapboxAccessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      controls: {
        inputs: false,
        instructions: false,
        profileSwitcher: false
      },
      geocoder: {
        geometries: 'geojson',
      },
    });
    directions.setOrigin([this.details.directions.origin.lng, this.details.directions.origin.lat]);
    directions.setDestination([this.details.directions.destination.lng, this.details.directions.destination.lat]);
    directions.on('route', (e) => {
      this.directionsGeoJson = polyline.toGeoJSON(e.route[0].geometry);
      console.log(this.directionsGeoJson)
    });

    // const directionsRequest = {
    //   origin: this.details.directions.origin,
    //   destination: this.details.directions.destination,
    //   travelMode: google.maps.TravelMode.DRIVING,
    // };
    // this.directionsResult = this.mapDirectionsService.route(directionsRequest).pipe(
    //   map(response => response.result),
    // );
  }

}
