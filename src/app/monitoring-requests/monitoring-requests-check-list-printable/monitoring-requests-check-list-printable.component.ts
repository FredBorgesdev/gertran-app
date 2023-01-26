import {Component, Input, OnInit} from '@angular/core';
import MonitoringRequest from '../monitoring-request';
import {ChecklistsService} from '../../checklists/checklists.service';

@Component({
  selector: 'app-monitoring-requests-check-list-printable',
  templateUrl: './monitoring-requests-check-list-printable.component.html',
  styleUrls: ['./monitoring-requests-check-list-printable.component.css']
})
export class MonitoringRequestsCheckListPrintableComponent implements OnInit {
  @Input() monitoringRequest: MonitoringRequest;

  checklistItems = [];

  constructor(public checklistService: ChecklistsService) {
  }

  ngOnInit(): void {
    this.checklistItems = this.checklistService.localizedValues;
  }
}
