import {Component, Input} from '@angular/core';
import MonitoringRequest from '../monitoring-request';
import {ChecklistsService} from '../../checklists/checklists.service';

@Component({
  selector: 'app-monitoring-requests-check-list-printable',
  templateUrl: './monitoring-requests-check-list-printable.component.html',
  styleUrls: ['./monitoring-requests-check-list-printable.component.css']
})
export class MonitoringRequestsCheckListPrintableComponent {
  @Input() monitoringRequest: MonitoringRequest;

  constructor(public checklistService: ChecklistsService) {
  }
}
