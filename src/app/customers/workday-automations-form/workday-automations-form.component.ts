import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {WorkdayAutomations, WorkdayAutomationsService} from '../workday-automations.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-workday-automations-form',
  templateUrl: './workday-automations-form.component.html',
  styleUrls: ['./workday-automations-form.component.css']
})
export class WorkdayAutomationsFormComponent extends BaseCrudFormComponent<WorkdayAutomations> {
  @Input() customerId: string;
  @Input() isVisible = false;
  @Output() closeModal = new EventEmitter();

  constructor(
    workdayAutomationsService: WorkdayAutomationsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    super(
      workdayAutomationsService,
      message,
      activatedRoute,
    );
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      eventName: [null],
      workdayStatus: [null],
      monitoringRequestStatus: [null],
      customer: [this.customerId]
    });
  }

  additionalParams(): any[] {
    return [this.customerId];
  }
}
