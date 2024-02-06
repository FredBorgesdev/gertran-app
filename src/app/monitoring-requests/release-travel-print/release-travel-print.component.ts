import { Component, Input, OnInit } from '@angular/core';
import MonitoringRequest from "../monitoring-request";
import { format } from "date-fns";

@Component({
  selector: 'app-release-travel-print',
  templateUrl: './release-travel-print.component.html',
  styleUrls: ['./release-travel-print.component.css']
})
export class ReleaseTravelPrintComponent {
  @Input() monitoringRequest: MonitoringRequest;

  constructor() {
  }


  firstWagonPlate(): string {
    return this.monitoringRequest?.data?.wagons.map(wagon => wagon.vehicle.plate)[0]
  }

  secondWagonPlate(): string {
    return this.monitoringRequest?.data?.wagons.map(wagon => wagon.vehicle.plate)[1]
  }

  workingSituation(): string {
    if (this.monitoringRequest?.data?.driver?.workingSituation == 'third_party') {
      return 'Terceiro'
    }
    if (this.monitoringRequest?.data?.driver?.workingSituation == 'fleet') {
      return 'Empregado'
    }
    if (this.monitoringRequest?.data?.driver?.workingSituation == 'aggregate') {
      return 'Agregado'
    }

  }

  get currentDate(): string {
    return format(new Date(), 'dd/MM/yyyy HH:mm:ss');
  }
}
