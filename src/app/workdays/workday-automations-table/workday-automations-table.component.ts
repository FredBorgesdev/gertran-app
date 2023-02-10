import {Component, Input, OnInit} from '@angular/core';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {WorkdayAutomations, WorkdayAutomationsService} from '../workday-automations.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-workday-automations-table',
  templateUrl: './workday-automations-table.component.html',
  styleUrls: ['./workday-automations-table.component.css']
})
export class WorkdayAutomationsTableComponent extends BaseCrudListComponent<WorkdayAutomations> {
  @Input() customerId: string;

  workflowAutomationColumns = [
    { title: 'Id' },
    { title: 'Macro' },
    { title: 'Status jornada' },
    { title: 'Status SM' },
  ];

  constructor(
    router: Router,
    workdayAutomationService: WorkdayAutomationsService,
    message: NzMessageService,
    modal: NzModalService,
  ) {
    super(
      'workday-automations',
      router,
      workdayAutomationService,
      message,
      modal,
    );
  }

  additionalParams(): any[] {
    return [this.customerId];
  }
}
