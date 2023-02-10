import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {WorkdayAutomations, WorkdayAutomationsService} from '../workday-automations.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {WorkdayService} from '../workday.service';
import {Choice} from '../../shared/services/api.service';

@Component({
  selector: 'app-workday-automations-form',
  templateUrl: './workday-automations-form.component.html',
  styleUrls: ['./workday-automations-form.component.css']
})
export class WorkdayAutomationsFormComponent extends BaseCrudFormComponent<WorkdayAutomations> implements OnInit {
  @Input() customerId: string;
  @Input() isVisible = false;
  @Input() workdayAutomation: WorkdayAutomations;
  @Output() closeModal = new EventEmitter();
  @Output() success = new EventEmitter();

  workdayStatus: Choice[] = [];
  travelStatus: Choice[] = [];

  constructor(
    workdayAutomationsService: WorkdayAutomationsService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private workdayService: WorkdayService,
  ) {
    super(
      workdayAutomationsService,
      message,
      activatedRoute,
    );
  }

  getId(): string {
    return this.workdayAutomation?.id;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.loadChoices();
  }

  loadChoices(): void {
    this.workdayService.getWorkdayStatus().subscribe(response => {
      this.workdayStatus = response;
    });
    this.workdayService.getTravelStatus().subscribe(response => {
      this.travelStatus = response;
    });
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      eventDescription: [null],
      workdayStatus: [null],
      monitoringRequestStatus: [null],
      customer: [this.customerId]
    });
  }

  additionalParams(): any[] {
    return [this.customerId];
  }

  performFormGroupSetValues(params?: { ignoreKeys?: string[] }): void {
    super.performFormGroupSetValues(params);

    if (this.resource.customer) {
      this.validateForm.controls.customer.setValue(this.resource.customer.id);
    }
  }

  list(): void {}

  protected handleSuccess(response?: any): void {
    super.handleSuccess(response);
    this.success.emit();
  }
}
