import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetAllResponse, getCurrentPage} from '../../shared/services/api.service';
import {MonitoringRequests} from '../monitoring-requests.service';
import {differenceInMinutes, format} from 'date-fns';

@Component({
  selector: 'app-monitoring-requests-table',
  templateUrl: './monitoring-requests-table.component.html',
  styleUrls: ['./monitoring-requests-table.component.css']
})
export class MonitoringRequestsTableComponent implements OnInit {
  @Input() monitoringRequests: GetAllResponse<MonitoringRequests>;
  @Input() rowColor = 'inherit';
  @Output() handleQueryParamsChange = new EventEmitter<any>();
  @Output() view = new EventEmitter<MonitoringRequests>();
  @Output() edit = new EventEmitter<MonitoringRequests>();
  @Output() delete = new EventEmitter<MonitoringRequests>();

  monitoringRequestsColumns = [
    { title: 'Código' },
    { title: 'Nº' },
    { title: 'Empresa' },
    { title: 'Embarcador' },
    { title: 'Motorista' },
    { title: 'Placa' },
    { title: 'Carretas' },
    { title: 'Modificação' },
    { title: 'Saída' },
    { title: 'Chegada' },
    { title: 'Ult. Posição' },
    { title: 'Horário' },
    { title: 'Tecnologia' },
    { title: 'Ações' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  get page(): number {
    return getCurrentPage(this.monitoringRequests);
  }

  getWagons(item: MonitoringRequests): string {
    return item.wagons.map(wagon => wagon.vehicle.plate).join(', ');
  }

  getUpdateDiff(item: MonitoringRequests): string {
    return differenceInMinutes(new Date(), new Date(item.updatedAt)) + ' minutos';
  }

  getArrivalTime(item: MonitoringRequests): string {
    const lastStep = item.travelSteps?.[item.travelSteps.length - 1];
    if (!lastStep) {
      return '';
    }

    const date = format(new Date(lastStep.date), 'dd/MM/yyyy');
    const time = lastStep.time;

    return `${date} ${time}`;
  }

  getDepartureTime(item: MonitoringRequests): string {
    const firstStep = item.travelSteps[0];
    if (!firstStep) {
      return '';
    }

    const date = format(new Date(firstStep.date), 'dd/MM/yyyy');
    const time = firstStep.time;

    return `${date} ${time}`;
  }
}
