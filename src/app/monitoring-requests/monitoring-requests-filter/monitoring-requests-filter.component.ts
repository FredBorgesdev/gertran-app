import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomerFilter} from '../../reports/filters/base-customer-filter/base-customer-filter.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';
import {AuthenticationService} from '../../authentication/authentication.service';

export type MonitoringRequestsFilter = {
  customer: string;
  from: Date;
  to: Date;
};

@Component({
  selector: 'app-monitoring-requests-filter',
  templateUrl: './monitoring-requests-filter.component.html',
  styleUrls: ['./monitoring-requests-filter.component.css']
})
export class MonitoringRequestsFilterComponent implements OnInit {
  @Output() filterData = new EventEmitter<CustomerFilter>();
  @Output() valueChanges = new EventEmitter<CustomerFilter>();

  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    public selectableCustomerService: SelectableCustomerServiceService,
    public authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      from: [this.twoDaysBefore, [Validators.required]],
      to: [new Date(), [Validators.required]],
    });

    this.validateForm.valueChanges.subscribe(() => {
      if (!this.valueChanges) {
        return;
      }
      this.valueChanges.emit(this.validateForm.value);
    });

    this.i18n.setLocale(en_US);

    if (!this.authService.customerId) {
      this.selectableCustomerService.init();
    }
  }

  search(): void {
    this.filterData.emit(this.validateForm.value);
  }

  get twoDaysBefore(): string {
    const date = new Date();
    date.setDate(date.getDate() - 2);

    return date.toISOString();
  }
}

