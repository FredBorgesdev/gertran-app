import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Customer, CustomersService} from '../../../customers/customers.service';
import {BaseFilter} from '../../reports.service';
import {format, subMonths} from 'date-fns';

@Component({
  selector: 'app-base-customer-filter',
  templateUrl: './base-customer-filter.component.html',
  styleUrls: ['./base-customer-filter.component.css']
})
export class BaseCustomerFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<BaseFilter>();
  @Input() hideButtons = false;

  validateForm: FormGroup;
  customers: Customer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    private customerService: CustomersService
  ) { }

  ngOnInit(): void {
    const today = new Date();
    const lastMonth = subMonths(today, 1);

    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      from: [lastMonth, [Validators.required]],
      to: [today, [Validators.required]],
      reportFormat: [null, [Validators.required]],
    });

    this.i18n.setLocale(en_US);

    this.customerService.getAll({ limit: 999 }).subscribe((response) => {
      this.customers = response.results;
    });
  }

  emitGenerateReport(): void {
    if (this.validateForm.valid) {
      const fromDate = format(this.validateForm.controls.from.value, 'yyyy-MM-dd');
      const toDate = format(this.validateForm.controls.to.value, 'yyyy-MM-dd');
      this.generateReport.emit({
        ...this.validateForm.value,
        from: fromDate,
        to: toDate
      });
    }
  }
}
