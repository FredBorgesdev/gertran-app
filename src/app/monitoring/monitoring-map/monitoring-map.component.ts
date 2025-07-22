import { Component, Input, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MonitoringMapData, MonitoringService } from '../monitoring.service';
import * as mapboxgl from 'mapbox-gl';
import { Position, PositionsService } from '../positions.service';
import { MonitoringRequestsService } from '../../monitoring-requests/monitoring-requests.service';
import { DirectionsService } from '../../shared/services/directions.service';
import { RiskAreaService } from '../risk-area.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { environment } from 'src/environments/environment';
import { ChangeDetectorRef } from '@angular/core';
// import * as turf from '@turf/turf';

@Component({
  selector: 'app-monitoring-map',
  templateUrl: './monitoring-map.component.html',
  styleUrls: ['./monitoring-map.component.css']
})
export class MonitoringMapComponent implements OnInit, AfterViewInit {
  @Input() item: Position;
  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef;

  map: mapboxgl.Map;
  zoom: number = 10;
  directionsGeoJson: any;
  directionsTruckGeoJson: any;
  driverLocation: [number, number];
  markers: [number, number][] = [];
  riskAreasGeoJson: any;


  constructor(
    private monitoringRequestService: MonitoringRequestsService,
    private directionsService: DirectionsService,
    private positionsService: PositionsService,
    private riskAreaService: RiskAreaService,
    private authService: AuthenticationService,
    private cdRef: ChangeDetectorRef,
  ) { }

  async ngOnInit() {
    this.driverLocation = [this.item.longitude, this.item.latitude];
    if (this.item?.monitoringRequest) {
      const arrayPositions = await this.positionsService.getPositionsByMonitoringRequest(this.item.monitoringRequest.id).toPromise()
      this.directionsTruckGeoJson = this.mountGeoJson(arrayPositions);
      const { routeCoordinates, travelSteps } = await this.monitoringRequestService.get(this.item.monitoringRequest.id).toPromise()
      this.markers = travelSteps.map(point => [point.longitude, point.latitude]);
      this.directionsGeoJson = this.mountGeoJson(routeCoordinates);
    }

    if (this.directionsTruckGeoJson) {
      this.map.addLayer({
        id: 'routeTruck',
        type: 'line',
        source: {
          type: 'geojson',
          data: this.directionsTruckGeoJson
        },
        paint: {
          'line-color': '#000000',
          'line-width': 2
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        }
      });
    }


    if (this.directionsGeoJson) {
      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: this.directionsGeoJson
        },
        paint: {
          'line-color': '#93a7da',
          'line-width': 5
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        }
      });
    }


    this.markers.forEach((marker, i) => {
      const el = document.createElement('span');
      el.innerHTML = `<img src="assets/icons/${this.getIcon(i).type}.png" alt="caminhão" width="25px" height="25px"/>`;
      new mapboxgl.Marker(el).setLngLat(marker).addTo(this.map);
    });

    if (this.driverLocation) {
      const truckEl = document.createElement('span');
      truckEl.innerHTML = `<img src="assets/images/logo/truck.svg" alt="caminhão" width="25px" height="25px" />`;
      new mapboxgl.Marker(truckEl).setLngLat(this.driverLocation).addTo(this.map);
    }

    if (this.authService.user.isGertranStaff) {
      const riskAreas = await this.riskAreaService.getAll({}, { customer: this.item.customer.id }).toPromise()
      this.riskAreasGeoJson = this.generateRiskAreasGeoJson(riskAreas.results);

      this.map.addSource('riskAreas', {
        type: 'geojson',
        data: this.riskAreasGeoJson
      });

      this.map.addLayer({
        id: 'riskAreaLayer',
        type: 'fill',
        source: 'riskAreas',
        paint: {
          'fill-color': 'rgba(255, 0, 0, 0.4)',  // Cor do preenchimento
          'fill-outline-color': '#ff0000'  // Cor da borda da área
        }

      });

      riskAreas.results.forEach(area => {
        if (area.pointType == 'allowed-point') {
          const el = document.createElement('span');
          el.innerHTML = `<img src="assets/icons/gas-station.png" alt="risco" width="24px" height="24px"/>`;

          new mapboxgl.Marker(el)
            .setLngLat([area.longitude, area.latitude])
            .setPopup(new mapboxgl.Popup().setText(area.name)) // popup com nome da área (opcional)
            .addTo(this.map);
        }
      });
    }
  }


  generateRiskAreasGeoJson(riskAreas) {
    const features = riskAreas.map(area => {
      const lat = area.latitude;
      const lon = area.longitude;
      const radiusInKm = area.radiusRiskArea / 1000; // Convertendo metros para quilômetros

      // Gerando pontos ao redor do centro para o buffer (exemplo simples de círculo)
      const numPoints = 30; // Número de pontos no círculo
      const points = [];

      for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * (2 * Math.PI); // Distribuição dos pontos em um círculo
        const latOffset = radiusInKm * Math.sin(angle);
        const lonOffset = radiusInKm * Math.cos(angle);

        // Calcular nova latitude e longitude
        const newLat = lat + (latOffset / 111.32); // 1 grau de latitude é aproximadamente 111.32 km
        const newLon = lon + (lonOffset / (111.32 * Math.cos(lat * Math.PI / 180))); // Ajuste da longitude com a latitude

        points.push([newLon, newLat]);
      }

      // Fechar o círculo unindo o primeiro ponto com o último
      points.push(points[0]);

      return {
        type: 'Feature',
        properties: {
          name: area.name,
          radiusKm: radiusInKm
        },
        geometry: {
          type: 'Polygon',
          coordinates: [points]
        }
      };
    });

    return {
      type: 'FeatureCollection',
      features: features
    };
  }



  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: 'mapContainer',
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [this.item.longitude, this.item.latitude],
      zoom: this.zoom,
      accessToken: environment.mapboxAccessToken
    });
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

  getIcon(i: number): { theme: any; color: string; type: string; } {
    if (i === 0) {
      return { type: 'flag-green', color: 'green', theme: 'twotone' };
    }
    if (i === this.markers.length - 1) {
      return { type: 'flag-red', color: 'salmon', theme: 'twotone' };
    }
    return { type: 'pushpin', color: 'lightred', theme: 'fill' };
  }
}