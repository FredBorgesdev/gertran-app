import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Customer, CustomersService} from '../../../customers/customers.service';
import {BasePeriodFilter, BaseUserFilter} from '../../reports.service';
import {format, subMonths} from 'date-fns';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {SelectableUsersService} from '../../../users/selectable-users.service';
import {XlsxExporterService} from '../../../shared/services/xlsx-exporter.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-base-user-filter',
  templateUrl: './base-user-filter.component.html',
  styleUrls: ['./base-user-filter.component.css'],
  providers: [SelectableUsersService],
})
export class BaseUserFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<BaseUserFilter>();
  @Output() valueChanges = new EventEmitter<BaseUserFilter>();
  @Input() hideButtons = false;
  @Input() showCustomer = true;
  @Input() rows: any[];
  @Input() fileName = 'relatorio';

  validateForm: FormGroup;
  customers: Customer[] = [];

  private isLoadingMoreData: boolean;
  private customersNextUrl: string;
  private searchCustomerSubject = new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    private customerService: CustomersService,
    public selectableUserService: SelectableUsersService,
    private xlsxExporterService: XlsxExporterService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    const today = new Date();
    const lastMonth = subMonths(today, 1);

    this.validateForm = this.formBuilder.group({
      customer: [null, this.showCustomer ? [Validators.required] : []],
      from: [lastMonth, [Validators.required]],
      to: [today, [Validators.required]],
      user: [null, []],
    });

    this.validateForm.valueChanges.subscribe(() => {
      if (!this.valueChanges) {
        return;
      }
      this.valueChanges.emit(this.validateForm.value);
    });

    this.searchCustomerSubject.pipe(debounceTime(500)).subscribe((name) => {
      this.isLoadingMoreData = true;
      this.customerService.getAll({ limit: 999 }, { name }).subscribe((customers) => {
        this.customers = customers.results;
        this.isLoadingMoreData = false;
      });
    });

    this.i18n.setLocale(en_US);

    this.loadMoreCustomers();
  }

  loadMoreCustomers(): void {
    this.isLoadingMoreData = true;
    this.customerService.getAll({
      limit: 999,
      url: this.customersNextUrl
    }).subscribe((customers) => {
      this.customersNextUrl = customers.next;
      this.customers = [...this.customers, ...customers.results];
      this.isLoadingMoreData = false;
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

  searchCustomer(name: string): void {
    if (!name) {
      return;
    }

    this.searchCustomerSubject.next(name);
  }

  generateExcel(): void {
    if (!this.rows || this.rows.length === 0) {
      this.message.error('Não há dados para exportar');
      return;
    }
    const fileNameWithCustomer = `${this.fileName} - ${this.customerName}`;

    this.xlsxExporterService.generate(fileNameWithCustomer, this.rows);
  }

  get columnWidth(): string {
    return this.showCustomer ? '6' : '8';
  }

  get customerName(): string {
    return this.customers.find((customer) => customer.id === this.validateForm.value.customer)?.tradingName;
  }
}
