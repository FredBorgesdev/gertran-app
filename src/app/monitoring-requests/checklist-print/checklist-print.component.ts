import {Component, Input, OnInit} from '@angular/core';
import MonitoringRequest from '../monitoring-request';
import {ChecklistsService} from '../../checklists/checklists.service';

@Component({
  selector: 'app-checklist-print',
  templateUrl: './checklist-print.component.html',
  styleUrls: ['./checklist-print.component.css']
})
export class ChecklistPrintComponent implements OnInit {
  @Input() monitoringRequest: MonitoringRequest;

  checklistItems = [];
  readOnly = true;

  constructor(public checklistService: ChecklistsService) {
  }

  ngOnInit(): void {
    this.checklistItems = this.checklistService.localizedValues;
  }

  wagonsPlates(): string {
    return this.monitoringRequest?.data?.wagons.map(wagon => wagon.vehicle.plate).join(', ') ?? '';
  }

  // get currentDate(): string {
  //   return format(new Date(), 'dd/MM/yyyy HH:mm:ss');
  // }
}
