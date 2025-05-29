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
  @Input() xlsxValues1 = [];
  @Input() xlsxValues2 = [];
  @Input() filterByAllCustomers = false;

  validateForm: FormGroup;
  customers: Customer[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    private message: NzMessageService,
    private xlsxExporterService: XlsxExporterService,
    private authService: AuthenticationService,
    public selectableCustomerService: SelectableCustomerServiceService,
  ) {
  }

  ngOnInit(): void {
    const today = new Date();
    const oneWeekFromNow = subWeeks(today, 1);

    this.validateForm = this.formBuilder.group({
      customer: [null, []],
      closingDay: [null, []],
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
        customer: this.validateForm.controls.customer.value,
      });
    }
  }

  generateExcel(): void {
    if ((!this.xlsxValues1 || this.xlsxValues1.length === 0) && (!this.xlsxValues2 || this.xlsxValues2.length === 0)) {
      this.message.error('Nenhum dado encontrado para exportar');
      return;
    }

    const fileNameWithCustomer = `${this.fileName} - Fechamento`;

    const rows1 = this.xlsxValues1 || [];
    const rows2 = this.xlsxValues2 || [];

    // Cabeçalhos do bloco 1
    const rows1Headers = rows1.length > 0 ? Object.keys(rows1[0]) : [];
    const rows1AsArrays = rows1.map(obj => rows1Headers.map(header => obj[header]));

    // Cabeçalhos do bloco 2
    const rows2Headers = rows2.length > 0 ? Object.keys(rows2[0]) : [];
    const rows2AsArrays = rows2.map(obj => rows2Headers.map(header => obj[header]));

    const combinedValues = [
      ['', '', 'RELAÇÃO DE VEÍCULOS FIXOS (MENSAIS)', ''], // Ocupa colunas 3 e 4
      [],
      rows1Headers,
      ...rows1AsArrays,
      [],
      [[''], ['TOTAL VEÍCULOS'], [rows1AsArrays.length]],
      [],
      ['', '', 'RELAÇÃO DE VIAGENS AVULSAS', ''], // Ocupa colunas 3 e 4
      [],
      rows2Headers,
      ...rows2AsArrays,
      [],
      [[''], [''], ['TOTAL VIAGENS'], [rows2AsArrays.length]],
    ];

    const values = this.xlsxValues.length > 0 ? this.xlsxValues : combinedValues;
    this.xlsxExporterService.generate2(fileNameWithCustomer, values);
  }

    generatePdf(): void {
    if ((!this.xlsxValues1 || this.xlsxValues1.length === 0) && (!this.xlsxValues2 || this.xlsxValues2.length === 0)) {
      this.message.error('Nenhum dado encontrado para exportar');
      return;
    }

    const doc = new jsPDF('l', 'pt', 'a4');

    const rows1 = this.xlsxValues1 || [];
    const rows2 = this.xlsxValues2 || [];

    const rows1Headers = rows1.length > 0 ? Object.keys(rows1[0]) : [];
    const rows1AsArrays = rows1.map(obj => rows1Headers.map(header => obj[header]));

    const rows2Headers = rows2.length > 0 ? Object.keys(rows2[0]) : [];
    const rows2AsArrays = rows2.map(obj => rows2Headers.map(header => obj[header]));

    const titleFontSize = 12;
    const sectionSpacing = 20;
    let currentY = 150;

    const addSection = (title: string, headers: string[], body: any[][], totalLabel: string) => {
      doc.setFontSize(titleFontSize);
      doc.text(title, 40, currentY);
      currentY += 10;

      autoTable(doc, {
        head: [headers],
        body,
        startY: currentY,
        margin: { left: 40, right: 40 },
        columnStyles: this.columnStyles,
        bodyStyles: { fontSize: 7 },
        didDrawPage: data => {
          if (data.pageCount === 1) {
            doc.setFontSize(30);
            doc.text(this.fileName.toUpperCase(), data.settings.margin.left, 60);
            doc.addImage('assets/images/logo/logogertran.png', 'PNG', 650, 10, 100, 100);

            doc.setFontSize(10);
            doc.text(
              `Filtros aplicados: ${format(this.validateForm.controls.from.value, 'dd/MM/yyyy')} - ${format(this.validateForm.controls.to.value, 'dd/MM/yyyy')}`,
              data.settings.margin.left,
              90
            );
          }

          const pageHeight = doc.internal.pageSize.height;
          doc.setFontSize(10);
          doc.text(`Gerado em: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, data.settings.margin.left, pageHeight - 30);
          doc.text(`Usuário: ${this.authService.user.name}`, doc.internal.pageSize.width - 150, pageHeight - 30);
        }
      });

      currentY = (doc as any).lastAutoTable.finalY + 10;

      doc.setFontSize(10);
      doc.text(`${totalLabel}: ${body.length}`, 40, currentY);
      currentY += sectionSpacing;
    };

    if (rows1.length > 0) {
      addSection('RELAÇÃO DE VEÍCULOS FIXOS (MENSAIS)', rows1Headers, rows1AsArrays, 'TOTAL VEÍCULOS');
        currentY += 25;  // ajuste conforme o necessário

    }
  

    if (rows2.length > 0) {
      addSection('RELAÇÃO DE VIAGENS AVULSAS', rows2Headers, rows2AsArrays, 'TOTAL VIAGENS');
    }

    doc.save(`${this.fileName} - Fechamento.pdf`);
  }


  get isGertranStaff(): boolean {
    return this.authService.user.isGertranStaff;
  }
}
