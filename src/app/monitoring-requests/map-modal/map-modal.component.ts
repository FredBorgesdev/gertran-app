import {Component, Input, OnInit} from '@angular/core';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {environment} from '../../../environments/environment';
import polyline from '@mapbox/polyline';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.css']
})
export class MapModalComponent implements OnInit {
  @Input() points: any[] = [];
  directionsGeoJson: any;
  markers = [];
  bounds = null;

  constructor() { }

  ngOnInit(): void {
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

    this.markers = this.points.map(point => ([point.longitude, point.latitude]));

    const origin = this.points[0];
    if (origin) {
      directions.setOrigin([origin.longitude, origin.latitude]);
    }

    const waypoints = this.points.slice(1, this.points.length - 1);
    waypoints.forEach((point) => {
      directions.addWaypoint(0, [point.longitude, point.latitude]);
    });

    const destination = this.points[this.points.length - 1];
    if (destination) {
      directions.setDestination([destination.longitude, destination.latitude]);
    }

    directions.on('route', (e) => {
      this.directionsGeoJson = polyline.toGeoJSON(e.route[0].geometry);
      this.bounds = new mapboxgl.LngLatBounds(
        this.directionsGeoJson.coordinates[0],
        this.directionsGeoJson.coordinates[this.directionsGeoJson.coordinates.length - 1]
      );
    });
  }

}
