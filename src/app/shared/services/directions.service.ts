import {Injectable} from '@angular/core';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import {environment} from '../../../environments/environment';
import polyline from '@mapbox/polyline';

@Injectable({
  providedIn: 'root'
})
export class DirectionsService {

  constructor() {
  }

  async getDirections(points: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
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

      const origin = points[0];
      if (origin) {
        directions.setOrigin([origin.longitude, origin.latitude]);
      }

      const waypoints = points.slice(1, points.length - 1);
      waypoints.forEach((point, index) => {
        directions.addWaypoint(index, [point.longitude, point.latitude]);
      });

      const destination = points[points.length - 1];
      if (destination) {
        directions.setDestination([destination.longitude, destination.latitude]);
      }

      directions.on('route', (e) => {
        resolve(e);
      });

      directions.on('error', (e) => {
        reject(e);
      });
    });
  }

  async getCoordinates(points: any[]): Promise<number[][]> {
    const result = await this.getDirections(points);

    if (!result?.route?.[0]) {
      return [];
    }

    const routes = polyline.toGeoJSON(result.route[0].geometry);

    return routes.coordinates;
  }
}
