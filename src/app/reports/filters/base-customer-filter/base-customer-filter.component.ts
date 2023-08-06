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
import {AuthenticationService} from "../../../authentication/authentication.service";

export enum ReportFormat {
  SYNTHETIC = 'synthetic',
  ANALYTIC = 'analytic',
  ALL = 'all',
}

export type CustomerFilter = BasePeriodFilter & {
  reportFormat: ReportFormat;
};

@Component({
  selector: 'app-base-customer-filter',
  templateUrl: './base-customer-filter.component.html',
  styleUrls: ['./base-customer-filter.component.css'],
  providers: [SelectableCustomerServiceService]
})
export class BaseCustomerFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<CustomerFilter>();
  @Output() valueChanges = new EventEmitter<CustomerFilter>();
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
    public selectableCustomerService: SelectableCustomerServiceService,
    private message: NzMessageService,
    private xlsxExporterService: XlsxExporterService,
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    const today = new Date();
    const oneWeekFromNow = subWeeks(today, 1);

    this.validateForm = this.formBuilder.group({
      customer: [this.authService.customerId, [Validators.required]],
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

    this.selectableCustomerService.init();

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
        customer: this.validateForm.value.customer === 'all' ? null : this.validateForm.value.customer,
      });
    }
  }

  generateExcel(): void {
    if (!this.rows || this.rows.length === 0) {
      this.message.error('Nenhum dado encontrado para exportar');
      return;
    }
    const fileNameWithCustomer = `${this.fileName} - ${this.selectedCustomerName}`;

    const values = this.xlsxValues.length > 0 ? this.xlsxValues : this.rows;
    this.xlsxExporterService.generate(fileNameWithCustomer, values);
  }

  get selectedCustomerName(): string {
    return this.selectableCustomerService.customers
      .find(
        (customer) => customer.id === this.validateForm.controls.customer.value
      )?.tradingName;
  }

  generatePdf(): void {
    const doc = new jsPDF('l', 'pt', 'a4');

    autoTable(doc, {
      html: 'table',
      didDrawPage: (data) => {
        doc.setFontSize(30);
        doc.text(this.fileName.toUpperCase(), data.settings.margin.left, data.settings.margin.top - 60);
        doc.addImage('assets/images/logo/logogertran.png', 'PNG', 650, 10, 100, 100);

        doc.setFontSize(10);
        doc.text(
          `Filtros aplicados: ${this.selectedCustomerName} - ${format(this.validateForm.controls.from.value, 'dd/MM/yyyy')} - ${format(this.validateForm.controls.to.value, 'dd/MM/yyyy')}`,
          data.settings.margin.left,
          data.settings.margin.top - 30
        );

        doc.text(
          `Gerado em: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 30
        );

        // Logged user on the bottom right
        doc.text(
          `Usuário: ${this.authService.user.name}`,
          doc.internal.pageSize.width - 150,
          doc.internal.pageSize.height - 30
        );
      },
      margin: {top: 140},
      columnStyles: this.columnStyles,
      bodyStyles: {
        fontSize: 7,
      }
    });

    doc.save(`${this.fileName} - ${this.selectedCustomerName}.pdf`);
  }

  get isGertranStaff(): boolean {
    return this.authService.user.isGertranStaff;
  }
}
