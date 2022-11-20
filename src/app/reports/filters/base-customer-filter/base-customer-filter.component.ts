import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Customer, CustomersService} from '../../../customers/customers.service';
import {BasePeriodFilter} from '../../reports.service';
import {format, subMonths} from 'date-fns';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd/message';
import {XlsxExporterService} from '../../../shared/services/xlsx-exporter.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export enum ReportFormat {
  SYNTHETIC = 'synthetic',
  ANALYTIC = 'analytic',
}

export type CustomerFilter = BasePeriodFilter & {
  reportFormat: ReportFormat;
};

@Component({
  selector: 'app-base-customer-filter',
  templateUrl: './base-customer-filter.component.html',
  styleUrls: ['./base-customer-filter.component.css']
})
export class BaseCustomerFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<CustomerFilter>();
  @Output() valueChanges = new EventEmitter<CustomerFilter>();
  @Input() hideButtons = false;
  @Input() rows: any[];
  @Input() fileName = 'Report.xlsx';

  validateForm: FormGroup;
  customers: Customer[] = [];

  private isLoadingMoreData: boolean;
  private customersNextUrl: string;
  private searchCustomerSubject = new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    private customerService: CustomersService,
    private message: NzMessageService,
    private xlsxExporterService: XlsxExporterService,
  ) { }

  ngOnInit(): void {
    const today = new Date();
    const lastMonth = subMonths(today, 1);

    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      from: [lastMonth, [Validators.required]],
      to: [today, [Validators.required]],
      reportFormat: [ReportFormat.ANALYTIC, [Validators.required]],
    });

    this.validateForm.valueChanges.subscribe(() => {
      if (!this.valueChanges) {
        return;
      }
      this.valueChanges.emit(this.validateForm.value);
    });

    this.searchCustomerSubject.pipe(debounceTime(500)).subscribe((name) => {
      this.isLoadingMoreData = true;
      this.customerService.getAll({ limit: 50 }, { name }).subscribe((customers) => {
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
      limit: 50,
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
      this.message.error('Nenhum dado encontrado para exportar');
      return;
    }
    const fileNameWithCustomer = `${this.fileName} - ${this.selectedCustomerName}`;

    this.xlsxExporterService.generate(fileNameWithCustomer, this.rows);
  }

  get selectedCustomerName(): string {
    return this.customers.find((customer) => customer.id === this.validateForm.controls.customer.value)?.tradingName;
  }

  generatePdf(): void {
    const doc = new jsPDF();

    autoTable(doc, {
      html: 'table',
      didDrawPage: (data) => {
        doc.addImage('assets/images/logo/logo.png', 'PNG', data.settings.margin.left, 15, 100, 20);
      },
      margin: { top: 50 }
    });

    doc.save('table.pdf');
  }
}
