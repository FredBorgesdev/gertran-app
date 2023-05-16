import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetAllResponse, getCurrentPage} from '../../shared/services/api.service';
import {MonitoringRequests, MonitoringRequestsService, PossibleStatus} from '../monitoring-requests.service';
import {AuthenticationService} from '../../authentication/authentication.service';
import {differenceInMinutes} from 'date-fns';

@Component({
  selector: 'app-monitoring-requests-table-minimal',
  templateUrl: './monitoring-requests-table-minimal.component.html',
  styleUrls: ['./monitoring-requests-table-minimal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitoringRequestsTableMinimalComponent implements OnInit {
  @Input() monitoringRequests: GetAllResponse<MonitoringRequests>;
  @Input() rowColor = 'inherit';
  @Output() handleQueryParamsChange = new EventEmitter<any>();

  isLoading = false;
  possibleStatus: PossibleStatus;

  monitoringRequestsColumns = [
    {title: 'Código'},
    {title: 'Empresa'},
    {title: 'Modificação'},
    {title: 'Motorista'},
    {title: 'Placa'},
    {title: 'Carretas'},
  ];

  constructor(
    private monitoringRequestService: MonitoringRequestsService,
    public authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.possibleStatus = this.monitoringRequestService.possibleStatus;
  }

  get page(): number {
    return getCurrentPage(this.monitoringRequests);
  }

  getWagons(item: MonitoringRequests): string {
    return item.wagons?.map(wagon => wagon.vehicle.plate).join(', ');
  }

  getUpdateDiff(monitoringRequest: MonitoringRequests): string {
    const diffInMinutes = differenceInMinutes(
      new Date(),
      new Date(monitoringRequest.updatedAt)
    );

    if (diffInMinutes > 60) {
      return `Atualizado há ${Math.floor(diffInMinutes / 60)}h`;
    }

    return `Atualizado há ${diffInMinutes}m`;
  }

  getUnderReviewClass(monitoringRequest: MonitoringRequests): string {
    const diffInMinutes = differenceInMinutes(
      new Date(),
      new Date(monitoringRequest.updatedAt)
    );

    if (diffInMinutes > 15) {
      return 'red-alert';
    }

    if (diffInMinutes > 10) {
      return 'yellow-alert';
    }

    return 'default-alert';
  }
}
