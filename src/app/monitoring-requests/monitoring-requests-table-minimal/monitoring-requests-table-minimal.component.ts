import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetAllResponse, getCurrentPage} from '../../shared/services/api.service';
import {MonitoringRequests, MonitoringRequestsService, PossibleStatus} from '../monitoring-requests.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthenticationService} from '../../authentication/authentication.service';

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
    {title: 'Motorista'},
    {title: 'Placa'},
    {title: 'Carretas'},
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

  get page(): number {
    return getCurrentPage(this.monitoringRequests);
  }

  getWagons(item: MonitoringRequests): string {
    return item.wagons?.map(wagon => wagon.vehicle.plate).join(', ');
  }
}
