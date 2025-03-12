import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetAllResponse, getCurrentPage} from '../../shared/services/api.service';
import {MonitoringRequests, MonitoringRequestsService, PossibleStatus, Status} from '../monitoring-requests.service';
import {differenceInMinutes, format} from 'date-fns';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthenticationService} from '../../authentication/authentication.service';

@Component({
  selector: 'app-monitoring-requests-table',
  templateUrl: './monitoring-requests-table.component.html',
  styleUrls: ['./monitoring-requests-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitoringRequestsTableComponent implements OnInit {
  @Input() monitoringRequests: GetAllResponse<MonitoringRequests>;
  @Input() rowColor = 'inherit';
  @Output() handleQueryParamsChange = new EventEmitter<any>();
  @Output() view = new EventEmitter<MonitoringRequests>();
  @Output() edit = new EventEmitter<MonitoringRequests>();
  @Output() delete = new EventEmitter<MonitoringRequests>();
  @Output() refreshAll = new EventEmitter<void>();

  isLoading = false;
  possibleStatus: PossibleStatus;

  monitoringRequestsColumns = [
    {title: 'Avaliação de Monitoramento', width:'150px'},
    {title: 'Código'},
    {title: 'Placa'},
    {title: 'Carretas'},
    {title: 'Tecnologia'},
    {title: 'Isca'},
    {title: 'Nº de ordem'},
    {title: 'Empresa'},
    {title: 'Embarcador'},
    {title: 'Motorista'},
    {title: 'Modificação'},
    {title: 'Saída'},
    {title: 'Chegada'},
    {title: 'Ult. Posição'},
    {title: 'Horário'},
  ];

  constructor(
    private monitoringRequestService: MonitoringRequestsService,
    private message: NzMessageService,
    public authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.possibleStatus = this.monitoringRequestService.possibleStatus;
  }

  getColumnWidth(column: any): string {
    if (column.width) {
      return column.width;
    } else {
      return '100px'; 
    }
  }

  get page(): number {
    return getCurrentPage(this.monitoringRequests);
  }

  getWagons(item: MonitoringRequests): string {
    // return item.wagons?.map(wagon => wagon.vehicle.plate).join(', ');
    return item.filteredWagons?.map(w => w.vehicle.plate).join(', ');
  }


  getBaits(item: MonitoringRequests): string {
    return item.baits?.map(baits => `${baits.serialNumber} ${baits.technology?.name}` ).join(', ');
  }

  getOcrNumber(item: MonitoringRequests): string {
    return item.loadingOrders?.map(loadingOrder => loadingOrder.ocrNumber).join(', ') || 'N/a';
  }

  getUpdateDiff(item: MonitoringRequests): string {
    const diffInMinutes = differenceInMinutes(new Date(), new Date(item.updatedAt));

    if (diffInMinutes > 60) {
      return `Atualizado há ${Math.floor(diffInMinutes / 60)}h`;
    }

    return `Atualizado há ${diffInMinutes}m`;
  }

  getArrivalTime(item: MonitoringRequests): string {
    const lastStep = item.travelSteps?.[item.travelSteps.length - 1];
    if (!lastStep) {
      return '';
    }

    const [year, month, day] = lastStep.date.split('-');
    const date = `${day}/${month}/${year}`;
    const time = lastStep.time;

    return `${date} ${time}`;
  }

  getDepartureTime(item: MonitoringRequests): string {
    try {
      const firstStep = item.travelSteps[0];
      if (!firstStep) {
        return '';
      }
  
      const [year, month, day] = firstStep.date.split('-');
      const date = `${day}/${month}/${year}`;
      const time = firstStep.time;
  
      return `${date} ${time}`;
    } catch (error) {
      return '';

    }
  }

  get statusIcons(): { [key: string]: string } {
    return {
      [Status.UNDER_REVIEW]: 'clock-circle',
      [Status.WAITING_FOR_START]: 'clock-circle',
      [Status.FINISHED]: 'check-circle',
      [Status.CANCELED]: 'close-circle',
      [Status.IN_PROGRESS]: 'car',
    };
  }

  moveMonitoringRequestToStatus(
    item: MonitoringRequests,
    status: PossibleStatus[string][0]
  ): void {
    this.isLoading = true;
    const body: any = {
      status: status.value,
    };
    if (body.status === Status.IN_PROGRESS) {
      body.travelStatus = 'in_progress';
    }
    
    let message;
    if (body.status === Status.FINISHED) {
      message = 'Informe o motivo da finalização';
    }

    if (message) {
      const observations = prompt(message);
      if (!observations) {
        this.message.error('Preencha o motivo da finalização corretamente.');
        this.isLoading = false;
        return;
      }

      body.observations = observations;
    }

    this.monitoringRequestService.update(item.id, body as MonitoringRequests).subscribe(() => {
      this.isLoading = false;
      this.message.success('Status atualizado com sucesso!');
      this.refreshAll.emit();
    }, () => {
      this.isLoading = false;
      this.message.error('Erro ao atualizar status');
    });
  }
}
