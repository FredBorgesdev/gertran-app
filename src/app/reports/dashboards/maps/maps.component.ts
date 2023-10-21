import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DatePipe} from '@angular/common';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {PositionsService} from '../../../monitoring/positions.service';
import {Status} from '../../../monitoring-requests/monitoring-requests.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {MapMarkersModalComponent} from '../../extra/map-markers-modal/map-markers-modal.component';
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  providers: [DatePipe]
})
export class DashboardMapsComponent implements OnInit, OnChanges {
  @Input() embed = false;
  @Input() customerId: string;

  markers = [];
  mapLoading = false;
  mapCenter = {lat: -14.2400732, lng: -53.1805017};

  constructor(
    private modalService: NzModalService,
    private authService: AuthenticationService,
    private positionService: PositionsService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.customerId.currentValue) {
      this.load();
    }
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.mapLoading = true;
    const queryParams = new URLSearchParams(window.location.search);
    const customer =
      queryParams.get('customerId') ||
      this.customerId ||
      this.authService.customerId;

    this.positionService.getAll({}, {
      customer,
      travelling: true,
      travelStatus: Status.IN_PROGRESS,
    }).subscribe((data) => {
      this.mapLoading = false;
      this.markers = data.results.map((position) => ({
        lat: position.latitude,
        lng: position.longitude,
      }));
    }, () => {
      this.mapLoading = false;
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
}
