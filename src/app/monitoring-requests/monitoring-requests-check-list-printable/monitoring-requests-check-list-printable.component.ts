import {Component, Input, OnInit} from '@angular/core';
import MonitoringRequest from '../monitoring-request';
import {ChecklistsService} from '../../checklists/checklists.service';
import {format} from "date-fns";

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

  get currentDate(): string {
    return format(new Date(), 'dd/MM/yyyy HH:mm:ss');
  }

  getLocalInstalaition(vehicleInstalation): String{
    if(vehicleInstalation == 'truck')
      return 'Cavalo'
    if(vehicleInstalation=='wagon')
      return 'Carreta'
    if(vehicleInstalation=='load')
      return 'Carga'
  }
}
