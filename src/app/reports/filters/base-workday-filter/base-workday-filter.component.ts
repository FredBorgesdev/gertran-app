import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { BaseWorkdayFilter } from '../../reports.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { en_US, NzI18nService } from 'ng-zorro-antd/i18n';
import { SelectableCustomerServiceService } from '../../../customers/selectable-customer-service.service';
import { XlsxExporterService } from '../../../shared/services/xlsx-exporter.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { format, subMonths } from 'date-fns';
import { SelectableDriversService } from '../../../drivers/selectable-drivers.service';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { SelectableTruckService } from 'src/app/trucks/selectable-truck.service';
import { WorkdayService } from 'src/app/workdays/workday.service';

@Component({
  selector: 'app-base-workday-filter',
  templateUrl: './base-workday-filter.component.html',
  styleUrls: ['./base-workday-filter.component.css'],
  providers: [SelectableDriversService, SelectableCustomerServiceService],
})
export class BaseWorkdayFilterComponent implements OnInit {
  @Output() generateReport = new EventEmitter<BaseWorkdayFilter>();
  @Output() valueChanges = new EventEmitter<BaseWorkdayFilter>();
  @Output() generatePDF2 = new EventEmitter<any>();
  @Output() emitGetFilterSelectedDataDriverCustomer = new EventEmitter<any>();
  @Output() emitGetFilterSelectedDataDriverCustomerDate = new EventEmitter<any>();
  @Input() rows: any[];
  @Input() fileName = 'relatorio';

  validateForm: FormGroup;
  @Input() showExtraFields: boolean = true;

  hoursMask = [/[0-2]/, /[0-9]/, ':', /[0-5]/, /[0-9]/];
  selectedDriverName: any | null;

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    public selectableCustomerService: SelectableCustomerServiceService,
    public selectableDriverService: SelectableDriversService,
    private xlsxExporterService: XlsxExporterService,
    private message: NzMessageService,
    private authService: AuthenticationService,
    public selectableTrucksService: SelectableTruckService,
    public workdayService: WorkdayService,
  ) {
  }

  ngOnInit(): void {
    this.selectableDriverService.init();
    this.selectableCustomerService.init();

    const today = new Date();
    const lastMonth = subMonths(today, 1);

    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      from: [lastMonth, [Validators.required]],
      to: [today, [Validators.required]],
      driver: [null, []],
      nightShiftStart: [null, []],
      nightShiftEnd: [null, []],
      reportFormat: ['synthetic', [Validators.required]],
    });

    this.validateForm.valueChanges.subscribe(() => {
      if (!this.valueChanges) {
        return;
      }
      this.valueChanges.emit(this.validateForm.value);
    });





    this.validateForm.get('driver')?.valueChanges.subscribe((driverId) => {
      if (driverId) {
        const selectedDriver = this.selectableDriverService.drivers.find(driver => driver.id === driverId);
        // const ad = selectedUser ? selectedUser.name : 'null';

        this.selectedDriverName = selectedDriver.name
      } else {
        this.selectedDriverName = null;
      }
    });

    if (this.authService.user.isGertranStaff) {
      this.selectableCustomerService.init();
    }

    if (this.authService.user.customer) {
      this.selectableCustomerService.concatCustomers(this.authService.user.customer);
      this.loadVehicles(this.authService.customerId);
    }

    this.i18n.setLocale(en_US);
  }

  loadVehicles(customerId: string): void {
    if (!customerId || customerId === 'all') {
      return;
    }

    this.selectableTrucksService.loadMoreTrucks({ customerId });
  }

  getFilterSelectedDataDriverCustomer(): void {
    this.emitGetFilterSelectedDataDriverCustomer.emit({
      driver: this.validateForm.value.driver,
      customer: this.validateForm.value.customer,
    })
  }

  getFilterSelectedDataCustomerDriverDate(): void {
    const fromDate = format(this.validateForm.controls.from.value, 'yyyy-MM-dd');
    const toDate = format(this.validateForm.controls.to.value, 'yyyy-MM-dd');
    this.emitGetFilterSelectedDataDriverCustomerDate.emit({
      driver: this.validateForm.value.driver,
      customer: this.validateForm.value.customer,
      fromDate: fromDate,
      toDate: toDate,
    })
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

  generateExcel(): void {
    if (!this.rows || this.rows.length === 0) {
      this.message.error('Não há dados para exportar');
      return;
    }
    const fileNameWithCustomer = `${this.fileName} - ${this.customerName}`;

    let dataToExcel = []
    if (this.validateForm.controls.reportFormat.value === 'analytic') {
      for (let i = 0; i < this.rows.length; i++) {
        dataToExcel.push({
          'id': this.rows[i].id,
          'data/hora': this.rows[i].startedAt,
          'status': this.rows[i].status,
          'origem': (this.rows[i].positionEvent ? this.rows[i].positionEvent.eventDescription : 'Registrado pelo Sistema').replace(/\n/g, ''),
          'motorista': this.rows[i].driver.name,
          'veículo': this.rows[i].vehicle.plate
        })
      }
      this.xlsxExporterService.generate(fileNameWithCustomer, dataToExcel);

    } else {
      this.xlsxExporterService.generate(fileNameWithCustomer, this.rows)
    }
  }


  emitGeneratePDF2(): void {
    const fromDate = format(this.validateForm.controls.from.value, 'dd/MM/yyyy');
    const toDate = format(this.validateForm.controls.to.value, 'dd/MM/yyyy');

    this.generatePDF2.emit({
      name: this.selectedDriverName,
      from: fromDate,
      to: toDate
    });
  }


  generatePdf(): void {
    const doc = new jsPDF();

    autoTable(doc, {
      html: 'table',
      didDrawPage: (data) => {
        doc.addImage('assets/images/logo/logogertran.png', 'PNG', 80, 10, 50, 50);
      },
      margin: { top: 70 },
      columnStyles: {
        0: {
          cellWidth: 30,
          fontSize: 8,
        }
      }
    });

    doc.save('table.pdf');
  }

  get customerName(): string {
    return this.selectableCustomerService.customers.find((customer) => customer.id === this.validateForm.value.customer)?.tradingName;
  }

  get selectedCustomerName(): string {
    return this.selectableCustomerService.customers
      .find(
        (customer) => customer.id === this.validateForm.controls.customer.value
      )?.tradingName;
  }

}
