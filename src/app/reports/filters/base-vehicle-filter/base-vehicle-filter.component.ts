import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Customer, CustomersService} from '../../../customers/customers.service';
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Truck, TrucksService} from '../../../trucks/trucks.service';
import {BaseVehicleFilter} from '../../reports.service';
import {SelectableTruckService} from '../../../trucks/selectable-truck.service';
import {format} from 'date-fns';
import {SelectableCustomerServiceService} from '../../../customers/selectable-customer-service.service';
import {XlsxExporterService} from '../../../shared/services/xlsx-exporter.service';
import {NzMessageService} from 'ng-zorro-antd/message';

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

  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private i18n: NzI18nService,
    public selectableTrucksService: SelectableTruckService,
    public selectableCustomerService: SelectableCustomerServiceService,
    private xlsxExporterService: XlsxExporterService,
    private message: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      customer: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      plate: [null, []],
    });

    this.i18n.setLocale(en_US);
    this.selectableCustomerService.init();
    this.selectableTrucksService.setupSearch();
  }

  emitGenerateReport(): void {
    if (this.validateForm.valid) {
      const fromDate = format(this.validateForm.controls.startDate.value, 'yyyy-MM-dd');
      const toDate = format(this.validateForm.controls.endDate.value, 'yyyy-MM-dd');
      this.generateReport.emit({
        ...this.validateForm.value,
        from: fromDate,
        to: toDate,
      });
    }
  }

  loadVehicles(customerId: string): void {
    this.selectableTrucksService.loadMoreTrucks({ customerId });
  }

  generateExcel(): void {
    if (!this.rows || this.rows.length === 0) {
      this.message.error('Não há dados para exportar');
      return;
    }
    const fileNameWithPlate = `${this.fileName} - ${this.validateForm.value.plate}`;

    this.xlsxExporterService.generate(fileNameWithPlate, this.rows);
  }
}
