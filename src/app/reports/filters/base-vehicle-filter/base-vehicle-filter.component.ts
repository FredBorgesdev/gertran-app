import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer, CustomersService} from '../../../customers/customers.service';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Truck, TrucksService} from '../../../trucks/trucks.service';
import {BaseVehicleFilter} from '../../reports.service';
import {SelectableTruckService} from '../../../trucks/selectable-truck.service';
import {format, subDays, subWeeks} from 'date-fns';
import {SelectableCustomerServiceService} from '../../../customers/selectable-customer-service.service';
import {XlsxExporterService} from '../../../shared/services/xlsx-exporter.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {AuthenticationService} from "../../../authentication/authentication.service";
import {ActivatedRoute} from "@angular/router";

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
    private route: ActivatedRoute,
    private trucksService: TrucksService,
    private customersService: CustomersService,
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

    this.route.queryParams.subscribe(async params => {
      const {customerId, vehiclePlate} = params || {};

      if (!customerId || !vehiclePlate) {
        return;
      }

      const customer = await this.customersService.get(customerId).toPromise();
      const {results} = await this.trucksService.getAll({}, {
        plate: vehiclePlate,
      }).toPromise();

      this.selectableCustomerService.appendCustomer(customer);
      this.selectableTrucksService.appendTrucks(results);

      const oneWeekAgo = subWeeks(new Date(), 1);
      this.validateForm.patchValue({
        customer: customerId,
        plate: vehiclePlate,
        startDate: oneWeekAgo,
        endDate: new Date(),
      });
    });
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
          `Filtros aplicados: ${this.selectedCustomerName} - ${this.validateForm.value.plate} - ${format(this.validateForm.controls.startDate.value, 'dd/MM/yyyy')} - ${format(this.validateForm.controls.endDate.value, 'dd/MM/yyyy')}`,
          data.settings.margin.left,
          data.settings.margin.top - 30
        );

        doc.text(
          `Gerado em: ${format(new Date(), 'dd/MM/yyyy HH:mm')}`,
          data.settings.margin.left,
          doc.internal.pageSize.height - 30
        );

        doc.text(
          `Usuário: ${this.authService.user.name}`,
          doc.internal.pageSize.width - 150,
          doc.internal.pageSize.height - 30
        );
      },
      margin: {top: 140},
      bodyStyles: {
        fontSize: 7,
      }
    });

    doc.save(`${this.fileName} - ${this.selectedCustomerName}.pdf`);
  }
}
