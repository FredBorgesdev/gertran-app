import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Customer, CustomersService} from '../../../customers/customers.service';

export interface BaseCustomerFilter {
  customer: string;
  startDate: Date;
  endDate: Date;
  reportFormat: string;
}

@Component({
  selector: 'app-base-customer-filter',
  templateUrl: './base-customer-filter.component.html',
  styleUrls: ['./base-customer-filter.component.css']
})
export class BaseCustomerFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<BaseCustomerFilter>();
  @Input() hideButtons = false;

  validateForm: FormGroup;
  customers: Customer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    private customerService: CustomersService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      reportFormat: [null, [Validators.required]],
    });

    this.i18n.setLocale(en_US);

    this.customerService.getAll({ limit: 999 }).subscribe((response) => {
      this.customers = response.results;
    });
  }

  emitGenerateReport(): void {
    if (this.validateForm.valid) {
      this.generateReport.emit(this.validateForm.value);
    }
  }
}
