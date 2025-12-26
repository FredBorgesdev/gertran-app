import { Component } from '@angular/core';
import { ControlTower4 } from './client.component';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router } from '@angular/router';
import { PositionsService } from 'src/app/monitoring/positions.service';
import { MonitoringRequestsService } from 'src/app/monitoring-requests/monitoring-requests.service';
import { ReportsService } from '../../reports.service';

@Component({
  selector: 'app-tc4-ops',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ControlTower4Ops extends ControlTower4 {
  constructor(
    public authService: AuthenticationService,
    router: Router,
    positionService: PositionsService,
    service: MonitoringRequestsService,
    reportsService: ReportsService,
  ) {
    super(authService, router, positionService, service, reportsService);
  }
}
