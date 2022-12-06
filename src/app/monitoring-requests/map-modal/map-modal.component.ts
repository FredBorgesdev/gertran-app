import {Component, Input, OnInit} from '@angular/core';
import polyline from '@mapbox/polyline';
import * as mapboxgl from 'mapbox-gl';
import {DirectionsService} from '../../shared/services/directions.service';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.css']
})
export class MapModalComponent implements OnInit {
  @Input() points: any[] = [];
  @Input() routeCoordinates: any[] = [];

  directionsGeoJson: any;
  markers = [];
  bounds = null;

  constructor(
    private directionsService: DirectionsService,
  ) { }

  ngOnInit(): void {
    this.markers = this.points.map(point => ([point.longitude, point.latitude]));

    if (this.routeCoordinates?.length > 0) {
      this.directionsGeoJson = {
        type: 'LineString',
        coordinates: this.routeCoordinates,
      };
      this.bounds = new mapboxgl.LngLatBounds(
        this.routeCoordinates[0],
        this.routeCoordinates[this.routeCoordinates.length - 1]
      );

      return;
    }

    this.directionsService.getDirections(this.points).then((e) => {
      this.directionsGeoJson = polyline.toGeoJSON(e.route[0].geometry);
      this.bounds = new mapboxgl.LngLatBounds(
        this.directionsGeoJson.coordinates[0],
        this.directionsGeoJson.coordinates[this.directionsGeoJson.coordinates.length - 1]
      );
    });
  }

}
