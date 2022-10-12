import {Component, Input, OnInit} from '@angular/core';
import {Monitoring, MonitoringMapData, MonitoringService} from '../monitoring.service';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import polyline from '@mapbox/polyline';
import {environment} from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import {Position} from '../positions.service';

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

  constructor(
    private service: MonitoringService,
  ) { }

  ngOnInit(): void {
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
      this.bounds = new mapboxgl.LngLatBounds(
        this.directionsGeoJson.coordinates[0],
        this.directionsGeoJson.coordinates[this.directionsGeoJson.coordinates.length - 1]
      );
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
