import {Component, Input, OnInit} from '@angular/core';
import {MonitoringMapData, MonitoringService} from '../monitoring.service';
import polyline from '@mapbox/polyline';
import * as mapboxgl from 'mapbox-gl';
import {Position} from '../positions.service';
import {MonitoringRequestsService} from '../../monitoring-requests/monitoring-requests.service';
import {DirectionsService} from '../../shared/services/directions.service';

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
  markers: [number, number][] = [];

  constructor(
    private service: MonitoringService,
    private monitoringRequestService: MonitoringRequestsService,
    private directionsService: DirectionsService,
  ) { }

  ngOnInit(): void {
    this.driverLocation = [this.item.longitude, this.item.latitude];

    this.monitoringRequestService.get(this.item.monitoringRequest.id).subscribe(async ({ routeCoordinates, travelSteps }) => {
      this.markers = travelSteps.map(point => [point.longitude, point.latitude]);

      if (!routeCoordinates && travelSteps?.length > 0) {
        routeCoordinates = await this.getDirections(travelSteps);
        this.monitoringRequestService.update(this.item.monitoringRequest.id, {
          routeCoordinates
        } as any).subscribe();
      }

      if (!routeCoordinates && travelSteps?.length === 0) {
        this.bounds = new mapboxgl.LngLatBounds(
          this.driverLocation,
          this.driverLocation,
        );
      } else {
        this.directionsGeoJson = this.mountGeoJson(routeCoordinates);
        this.bounds = new mapboxgl.LngLatBounds(
          this.driverLocation,
          routeCoordinates[routeCoordinates.length - 1]
        );
      }
    });
  }

  async getDirections(travelSteps: any[]): Promise<[number, number][]> {
    const result = await this.directionsService.getDirections(travelSteps);
    const routes = polyline.toGeoJSON(result.route[0].geometry);

    return routes.coordinates;
  }

  mountGeoJson(routeCoordinates: [number, number][]): any {
    return {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: routeCoordinates
      }
    };
  }
}
