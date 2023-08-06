import {Component, Input, OnInit} from '@angular/core';
import MonitoringRequest from "../monitoring-request";
import {format} from "date-fns";

@Component({
  selector: 'app-release-travel-print',
  templateUrl: './release-travel-print.component.html',
  styleUrls: ['./release-travel-print.component.css']
})
export class ReleaseTravelPrintComponent {
  @Input() monitoringRequest: MonitoringRequest;

  constructor() {
  }

  wagonsPlates(): string {
    return this.monitoringRequest?.data?.wagons.map(wagon => wagon.vehicle.plate).join('/') ?? '';
  }

  get currentDate(): string {
    return format(new Date(), 'dd/MM/yyyy HH:mm:ss');
  }
}
