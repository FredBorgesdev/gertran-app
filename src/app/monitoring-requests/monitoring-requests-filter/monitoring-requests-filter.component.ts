import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CustomerFilter} from '../../reports/filters/base-customer-filter/base-customer-filter.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {format, subMonths} from 'date-fns';
import {SelectableCustomerServiceService} from '../../customers/selectable-customer-service.service';

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
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      from: [null, [Validators.required]],
      to: [null, [Validators.required]],
    });

    this.validateForm.valueChanges.subscribe(() => {
      if (!this.valueChanges) {
        return;
      }
      this.valueChanges.emit(this.validateForm.value);
    });

    this.i18n.setLocale(en_US);

    this.selectableCustomerService.init();
  }

  search(): void {
    this.filterData.emit(this.validateForm.value);
  }
}

