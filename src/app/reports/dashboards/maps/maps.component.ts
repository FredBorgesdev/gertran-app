import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {PositionsService} from '../../../monitoring/positions.service';
import {Status} from '../../../monitoring-requests/monitoring-requests.service';
import {NzModalService} from 'ng-zorro-antd/modal';
import {MapMarkersModalComponent} from '../../extra/map-markers-modal/map-markers-modal.component';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  providers: [DatePipe]
})
export class DashboardMapsComponent implements OnInit {
  @Input() embed = false;

  markers = [];
  mapLoading = false;
  mapCenter = {lat: -14.2400732, lng: -53.1805017};

  constructor(
    private modalService: NzModalService,
    private authService: AuthenticationService,
    private positionService: PositionsService,
  ) {
  }

  ngOnInit(): void {
    this.mapLoading = true;
    this.positionService.getAll({}, {
      customer: this.authService.customerId,
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
