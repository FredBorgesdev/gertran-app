import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseCrudListComponent} from '../../base-crud/base-crud-list/base-crud-list.component';
import {WorkdayAutomations, WorkdayAutomationsService} from '../workday-automations.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-workday-automations-table',
  templateUrl: './workday-automations-table.component.html',
  styleUrls: ['./workday-automations-table.component.css']
})
export class WorkdayAutomationsTableComponent extends BaseCrudListComponent<WorkdayAutomations> implements OnInit {
  @Input() customerId: string;
  @Input() refreshWorkdayAutomations: Observable<void>;
  @Output() editWorkdayAutomation = new EventEmitter();

  workflowAutomationColumns = [
    { title: 'Id' },
    { title: 'Macro' },
    { title: 'Status jornada' },
    { title: 'Status SM' },
    { title: 'Ações' },
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

  ngOnInit(): void {
    super.ngOnInit();

    this.refreshWorkdayAutomations.subscribe(() => {
      this.loadResources();
    });
  }

  additionalParams(): any[] {
    return [this.customerId];
  }

  edit(workdayAutomation: WorkdayAutomations): void {
    this.editWorkdayAutomation.emit(workdayAutomation);
  }
}
