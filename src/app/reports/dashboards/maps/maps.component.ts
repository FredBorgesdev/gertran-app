import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DatePipe} from '@angular/common';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {PositionsService} from '../../../monitoring/positions.service';
import {Status} from '../../../monitoring-requests/monitoring-requests.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {MapMarkersModalComponent} from '../../extra/map-markers-modal/map-markers-modal.component';
import {ActivatedRoute, Route, Router} from "@angular/router";
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  providers: [DatePipe]
})
export class DashboardMapsComponent implements OnInit, OnChanges, OnDestroy {
  // @Input() embed = false;
  @Input() customerId: string;
  // @Input() mapFullPage = true;
  map: mapboxgl.Map;
  @Input() mapClassHeight: string = 'full-map'
  markers: any[] = [];
  mapLoading = false;
  // Centro do Brasil
  mapCenter: [number, number] = [-50.1805017, -16.4400732]; // [lng, lat] formato Mapbox

  private refreshInterval: any;

  constructor(
    private modalService: NzModalService,
    private authService: AuthenticationService,
    private positionService: PositionsService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.customerId?.currentValue) {
      this.load();
    }
  }

  ngOnInit(): void {
    this.load();
    // Atualiza a cada 2 minutos para dashboard de operação
    this.refreshInterval = setInterval(() => this.load(), 2 * 60 * 1000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  load(): void {
    this.mapLoading = true;
    const queryParams = new URLSearchParams(window.location.search);
    let customer =
      queryParams.get('customerId') ||
      this.customerId ||
      this.authService.customerId;

    // Debug: ver o que está sendo usado como customer
    console.log('[MAPA] Customer ID:', customer);

    // Monta os filtros - se não tem customer, usa allowGlobal para ver todos
    const filters: any = {
      travelling: true,
    };
    
    if (customer) {
      filters.customer = customer;
    } else {
      // Staff Gertran sem customer selecionado - ver todos os veículos
      filters.allowGlobal = true;
      console.log('[MAPA] Modo global ativado - exibindo todos os veículos');
    }

    // Buscar todos os veículos em viagem (limit alto para pegar todos)
    this.positionService.getAll({ limit: 500 }, filters).subscribe((data) => {
      this.mapLoading = false;
      console.log('[MAPA] Resposta da API:', data);
      
      // Alguns serviços retornam paginação; se houver "results" use, senão trate como lista
      const list = Array.isArray(data?.results) ? data.results : (Array.isArray(data) ? data : []);
      console.log('[MAPA] Lista de posições:', list.length);
      
      this.markers = list
        .filter((position) => position.latitude && position.longitude) // Filtra posições válidas
        .map((position) => {
          // Mapbox espera [lng, lat] como array
          const marker: any = [Number(position.longitude), Number(position.latitude)];
          marker.lat = Number(position.latitude);
          marker.lng = Number(position.longitude);
          marker.plate = position.vehiclePlate || 'Sem placa';
          marker.travelStatus = position.monitoringRequest?.travelStatus || 'in_progress';
          return marker;
        });
      
      console.log('[MAPA] Veículos carregados:', this.markers.length);
      if (this.markers.length > 0) {
        console.log('[MAPA] Primeiro marker:', this.markers[0]);
      }
    }, (error) => {
      this.mapLoading = false;
      console.error('[MAPA] Erro ao carregar posições:', error);
    });
  }

  expandMap(): void {
    this.modalService.create({
      nzTitle: 'Mapa',
      nzContent: MapMarkersModalComponent,
      nzComponentParams: {
        markers: this.markers,
        mapCenter: this.mapCenter,
      },
      nzWidth: '80%',
    });
  }

  showPopup(marker: any): void {
    if (!this.map) return;
    const popup = new mapboxgl.Popup({ closeButton: false })
      .setHTML(`<strong>${marker.plate}</strong>`)
      .setLngLat([marker.lng, marker.lat])
      .addTo(this.map);
  }

  mapLoaded(map: mapboxgl.Map): void {
    this.map = map;
  }
}
