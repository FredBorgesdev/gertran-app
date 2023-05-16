import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer, CustomersService} from '../../../customers/customers.service';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Truck, TrucksService} from '../../../trucks/trucks.service';
import {BaseVehicleFilter} from '../../reports.service';
import {SelectableTruckService} from '../../../trucks/selectable-truck.service';
import {format, subDays} from 'date-fns';
import {SelectableCustomerServiceService} from '../../../customers/selectable-customer-service.service';
import {XlsxExporterService} from '../../../shared/services/xlsx-exporter.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {AuthenticationService} from "../../../authentication/authentication.service";

@Component({
  selector: 'app-base-vehicle-filter',
  templateUrl: './base-vehicle-filter.component.html',
  styleUrls: ['./base-vehicle-filter.component.css'],
  providers: [SelectableTruckService, SelectableCustomerServiceService],
})
export class BaseVehicleFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<BaseVehicleFilter>();
  @Input() hideButtons = false;
  @Input() rows: any[];
  @Input() fileName = 'relatorio';
  @Input() xlsxValues: any[];
  @Input() additionalFilters: {
    label: string;
    value: string;
  }[] = [];
  @Input() filterByAllCustomers = false;

  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    public selectableTrucksService: SelectableTruckService,
    public selectableCustomerService: SelectableCustomerServiceService,
    private xlsxExporterService: XlsxExporterService,
    private message: NzMessageService,
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    const today = new Date();
    const yesterday = subDays(today, 1);

    this.validateForm = this.formBuilder.group({
      customer: [this.authService.customerId || null, [Validators.required]],
      startDate: [yesterday, [Validators.required]],
      endDate: [today, [Validators.required]],
      plate: [null, []],
    });

    this.additionalFilters.forEach((filter) => {
      this.validateForm.addControl(
        filter.value,
        this.formBuilder.control(null, [])
      );
    });

    this.i18n.setLocale(en_US);
    this.selectableTrucksService.setupSearch();

    if (this.authService.user.isGertranStaff) {
      this.selectableCustomerService.init();
    }

    if (this.authService.user.customer) {
      this.selectableCustomerService.concatCustomers(this.authService.user.customer);
      this.loadVehicles(this.authService.customerId);
    }
  }

  emitGenerateReport(): void {
    if (this.validateForm.valid) {
      const fromDate = format(this.validateForm.controls.startDate.value, 'yyyy-MM-dd');
      const toDate = format(this.validateForm.controls.endDate.value, 'yyyy-MM-dd');
      this.generateReport.emit({
        ...this.validateForm.value,
        from: fromDate,
        to: toDate,
        customer: this.validateForm.value.customer === 'all' ? null : this.validateForm.value.customer,
      });
    }
  }

  loadVehicles(customerId: string): void {
    if (!customerId || customerId === 'all') {
      return;
    }

    this.selectableTrucksService.loadMoreTrucks({customerId});
  }

  generateExcel(): void {
    if (!this.rows || this.rows.length === 0) {
      this.message.error('Não há dados para exportar');
      return;
    }
    const fileNameWithPlate = `${this.fileName} - ${this.validateForm.value.plate}`;

    const values = this.xlsxValues.length > 0 ? this.xlsxValues : this.rows;
    this.xlsxExporterService.generate(fileNameWithPlate, values);
  }

  generatePdf(): void {
    const doc = new jsPDF();

    autoTable(doc, {
      html: 'table',
      didDrawPage: (data) => {
        doc.addImage('assets/images/logo/logogertran.png', 'PNG', 80, 10, 50, 50);
      },
      margin: {top: 70}
    });

    doc.save('table.pdf');
  }
}
