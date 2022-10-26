import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {GetAllResponse, getCurrentPage} from '../../shared/services/api.service';
import {MonitoringRequests} from '../monitoring-requests.service';

@Component({
  selector: 'app-monitoring-requests-table',
  templateUrl: './monitoring-requests-table.component.html',
  styleUrls: ['./monitoring-requests-table.component.css']
})
export class MonitoringRequestsTableComponent implements OnInit {
  @Input() monitoringRequests: GetAllResponse<MonitoringRequests>;
  @Output() handleQueryParamsChange = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  monitoringRequestsColumns = [
    { title: 'Id' },
    { title: 'Embarcador' },
    { title: 'Transportador' },
    { title: 'Motorista' },
    { title: 'Operação' },
    { title: 'Ações' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  get page(): number {
    return getCurrentPage(this.monitoringRequests);
  }
}
