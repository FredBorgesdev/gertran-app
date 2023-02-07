import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BaseCrudFormComponent} from '../../base-crud/base-crud-form/base-crud-form.component';
import {Workday, WorkdayService} from '../workday.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute} from '@angular/router';
import {Customer} from '../customers.service';

@Component({
  selector: 'app-workday-tab',
  templateUrl: './workday-tab.component.html',
  styleUrls: ['./workday-tab.component.css']
})
export class WorkdayTabComponent extends BaseCrudFormComponent<Workday> {
  @Input() customer: Customer;
  isLoading = false;
  validateForm: FormGroup;

  hoursMask = [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];

  constructor(
    private formBuilder: FormBuilder,
    workdayService: WorkdayService,
    message: NzMessageService,
    activatedRoute: ActivatedRoute
  ) {
    super(
      workdayService,
      message,
      activatedRoute
    );
  }

  getId(): string {
    return this.customer.workdaySettings?.id;
  }

  additionalParams(): any[] {
    return [this.customer.id];
  }

  loadFormBuilder(): void {
    this.validateForm = this.formBuilder.group({
      maximumWorkdayPeriod: [null],
      maximumHoursContinuousDriving: [null],
      restPeriodToBreakContinuousDriving: [null],
      maximumHoursDailyDriving: [null],
      minimumContinuousRestPeriod: [null],
      minimumLunchRestPeriod: [null],
      restPeriodBetweenWorkingDays: [null],
      maximumHoursPerWeek: [null],
      maximumContinuousRestPeriod: [null],
    });
  }

  performFormGroupSetValues(): void {
    Object.keys(this.resource).forEach(key => {
      if (this.validateForm.controls[key]) {
        const minutes = this.resource[key];
        const hours = Math.floor(minutes / 60).toString().padStart(2, '0');
        const hoursAndMinutes = `${hours}:${minutes % 60}`;

        this.validateForm.controls[key].setValue(hoursAndMinutes);
      }
    });
  }

  getValues(): any {
    const values = {};

    Object.keys(this.validateForm.controls).forEach(key => {
      const value = this.validateForm.controls[key].value;
      const [hours, minutes] = value.split(':');
      values[key] = Number(hours) * 60 + Number(minutes);
    });

    return values;
  }

  list() {
  }
}
