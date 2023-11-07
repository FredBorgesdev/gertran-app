import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {DirectionsService} from '../../shared/services/directions.service';
import {Stop} from '../../stops/stops.service';
import polyline from '@mapbox/polyline';

@Component({
  selector: 'app-stops-map',
  templateUrl: './stops-map.component.html',
  styleUrls: ['./stops-map.component.css']
})
export class StopsMapComponent implements OnInit, OnChanges {
  @Input() points: any[] = [];
  map: mapboxgl.Map;

  bounds = null;
  directionsGeoJson: any;
  markers: [number, number][] = [];

  constructor(
    private directionsService: DirectionsService,
  ) {
  }

  ngOnInit(): void {
    this.loadMap(this.points);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.map) {
      return;
    }
    if (changes.points?.previousValue?.length !== changes.points?.currentValue?.length) {
      this.loadMap(changes.points?.currentValue || []);
    }
  }

  loadMap(points: any[]): void {
    this.markers = points.map(point => [point.longitude, point.latitude]);
    this.directionsService.getDirections(this.points).then(result => {
      this.directionsGeoJson = {
        id: 'directions',
        ...polyline.toGeoJSON(result.route[0].geometry)
      };

      console.log(this.directionsGeoJson)

      this.bounds = new mapboxgl.LngLatBounds();
      this.points.forEach(point => {
        this.bounds.extend([point.longitude, point.latitude]);
      });
    });
  }

  mapLoaded(map: mapboxgl.Map): void {
    this.map = map;
  }
}
