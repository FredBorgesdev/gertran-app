import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Customer} from '../../../customers/customers.service';
import {BasePeriodFilter} from '../../reports.service';
import {format, subMonths, subWeeks} from 'date-fns';
import {NzMessageService} from 'ng-zorro-antd/message';
import {XlsxExporterService} from '../../../shared/services/xlsx-exporter.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {SelectableCustomerServiceService} from '../../../customers/selectable-customer-service.service';
import {AuthenticationService} from '../../../authentication/authentication.service';

export enum ReportFormat {
  SYNTHETIC = 'synthetic',
  ANALYTIC = 'analytic',
  ALL = 'all',
}

export type ClosingFilter = BasePeriodFilter & {
  reportFormat: ReportFormat;
};

@Component({
  selector: 'app-base-closing-filter',
  templateUrl: './base-closing-filter.component.html',
  styleUrls: ['./base-closing-filter.component.css'],
  providers: [SelectableCustomerServiceService]
})
export class BaseClosingFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<ClosingFilter>();
  @Output() valueChanges = new EventEmitter<ClosingFilter>();
  @Input() hideButtons = false;
  @Input() rows: any[];
  @Input() fileName = 'Report.xlsx';
  @Input() columnStyles = {};
  @Input() xlsxValues = [];
  @Input() filterByAllCustomers = false;

  validateForm: FormGroup;
  customers: Customer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    private message: NzMessageService,
    private xlsxExporterService: XlsxExporterService,
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    const today = new Date();
    const oneWeekFromNow = subWeeks(today, 1);

    this.validateForm = this.formBuilder.group({
      closingDay: [null, [Validators.required]],
      from: [oneWeekFromNow, [Validators.required]],
      to: [today, [Validators.required]],
      reportFormat: [ReportFormat.ANALYTIC, [Validators.required]],
    });

    this.validateForm.valueChanges.subscribe(() => {
      if (!this.valueChanges) {
        return;
      }
      this.valueChanges.emit(this.validateForm.value);
    });

    this.i18n.setLocale(en_US);
  }

  emitGenerateReport(): void {
    if (this.validateForm.valid) {
      const fromDate = format(this.validateForm.controls.from.value, 'yyyy-MM-dd');
      const toDate = format(this.validateForm.controls.to.value, 'yyyy-MM-dd');
      this.generateReport.emit({
        ...this.validateForm.value,
        from: fromDate,
        to: toDate,
      });
    }
  }

  generateExcel(): void {
    if (!this.rows || this.rows.length === 0) {
      this.message.error('Nenhum dado encontrado para exportar');
      return;
    }
    const fileNameWithCustomer = `${this.fileName} - Fechamento`;

    const values = this.xlsxValues.length > 0 ? this.xlsxValues : this.rows;
    this.xlsxExporterService.generate(fileNameWithCustomer, values);
  }

  generatePdf(): void {
    const doc = new jsPDF('l', 'pt', 'a4');

    autoTable(doc, {
      html: 'table',
      didDrawPage: (data) => {
        doc.addImage('assets/images/logo/logogertran.png', 'PNG', 80, 10, 50, 50);
      },
      margin: {top: 70},
      columnStyles: this.columnStyles,
    });

    doc.save('table.pdf');
  }

  get isGertranStaff(): boolean {
    return this.authService.user.isGertranStaff;
  }
}
